import axios from "axios";
import { createStore } from "vuex";
import {
	UPDATE_SELECTED_LOCATIONS,
	UPDATE_WEATHER_DATA,
	DELETE_WEATHER_DATA,
	SET_IS_LOADING,
	SET_IS_ERROR,
	SET_IS_DUPLICATE,
	SET_WEATHER_DATA
} from "./mutation-types";

export default createStore({
	state: {
		isLoading: false,
		selectedLocations: [],
		weatherData: [],
		searchValue: "",
		isDuplicate: false,
		isError: false,
	},

	getters: {
		GET_SELECTED_LOCATIONS(state) {
			return state.selectedLocations;
		},
		GET_WEATHER_DATA(state) {
			return state.weatherData;
		},
		GET_IS_LOADING(state) {
			return state.isLoading;
		},
		GET_SEARCH_VALUE(state) {
			return state.searchValue;
		},
		GET_IS_DUPLICATE(state) {
			return state.isDuplicate;
		},
		GET_IS_ERROR(state) {
			return state.isError;
		}
	},

	mutations: {
		[SET_IS_LOADING](state, value) {
			state.isLoading = value;
		},
		[SET_IS_DUPLICATE](state, value) {
			state.isDuplicate = value;
		},
		[SET_IS_ERROR](state, value) {
			state.isError = value;
		},

		[SET_WEATHER_DATA](state, data) {
			state.weatherData = data;
		},

		[UPDATE_SELECTED_LOCATIONS](state) {
			const localStorageLocations = localStorage.getItem("selectedLocations");
			if (!localStorageLocations) {
				state.selectedLocations = [];
			} else {
				state.selectedLocations = JSON.parse(localStorageLocations);
			}
		},

		[UPDATE_WEATHER_DATA](state, data) {
			state.weatherData.push(data);
		},

		[DELETE_WEATHER_DATA](state, id) {
			const itemToRemoveIdx = state.weatherData.findIndex((el) => el.id === id);
			state.weatherData.splice(itemToRemoveIdx, 1);
		},
	},

	actions: {
		async fetchUserLocationInfo() {
			try {
				const response = await axios.get(`https://ipinfo.io/json?token=${process.env.VUE_APP_IP_INFO_KEY}`);
				return response.data;
			} catch (error) {
				console.error(`Failed to fetch User location: ${error.message}`)
			};
		},

		async checkLocationsData({ state, commit, dispatch }) {

			if (!state.selectedLocations[0]) {
				commit(SET_IS_LOADING, true);

				const { city, country } = await dispatch("fetchUserLocationInfo");
				await dispatch("fetchWeatherData", city, country);
				await dispatch("setLocalStorageLocations");

				commit(SET_IS_LOADING, false);
			} else {
				dispatch("loadSelectedLocationsData", state.selectedLocations);
			}
		},

		setLocalStorageLocations({ state, commit }, locations) {
			if (!locations || locations.length === 0) {
				localStorage.setItem("selectedLocations", JSON.stringify(state.weatherData));
			} else {
				localStorage.setItem("selectedLocations", JSON.stringify(locations));
			}
			commit(UPDATE_SELECTED_LOCATIONS);
		},

		async fetchWeatherData({ commit, state }, city, country) {
			try {
				await axios
					.get(
						`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`
					)
					.then((response) => {
						const isDuplicate = state.weatherData.some((location) => location.id === response.data.id);
						if (isDuplicate) {
							commit(SET_IS_DUPLICATE, true)
							return;
						}

						commit(UPDATE_WEATHER_DATA, response.data);
					})
					.catch((error) => {
						console.error(`Error updating weather data: ${error.message}`);
						commit(SET_IS_ERROR, true)
					});
			} catch (error) {
				console.error(`Error fetching weather data: ${error.message}`);
			}
		},

		async handleSearchCity({ dispatch, commit }, value) {
			commit("SET_IS_DUPLICATE", false);
			commit("SET_IS_ERROR", false);
			await dispatch("fetchWeatherData", value);
			dispatch("setLocalStorageLocations");
		},


		loadSelectedLocationsData({ commit, dispatch }, selectedLocations) {
			commit(SET_IS_LOADING, true);

			selectedLocations.map(async (item) => {
				await dispatch("fetchWeatherData", item.name, item.sys.country)
			})
			commit(SET_IS_LOADING, false);
		},
	},
});