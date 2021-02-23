import Vue from 'vue';

const state = {
    facets: {},
    totalFilters: 0,
    searchText: "",
    clearOnRedirect: true
};

const getters = {
    isReady: (state) => {
        return state.facets.length > 0;
    }
}

const actions = {}

const mutations = {
    clearAllFacets(state){
        state.totalFilters = 0;
        Vue.set(state, 'facets', {});
    },

    toggleFacet(state, { facet, filter }) {
        if (typeof(state.facets[facet]) === "undefined"){
            state.facets[facet] = [];
        }

        if (state.facets[facet].indexOf(filter) !== -1){
           state.facets[facet].splice(state.facets[facet].indexOf(filter), 1)
           state.totalFilters -= 1;
           if (state.facets[facet].length === 0){
               delete state.facets[facet];
           }

        }else {
            state.facets[facet].push(filter);
            state.totalFilters += 1;
        }
    },

    setSearchText(state, text ) {
        state.searchText = text;
    },

    setClearOnRedirect(state, clear ) {
        state.clearOnRedirect = clear;
    },

    setSearchTextAndRedirect(state, text ){
        state.searchText = text;
        window.location.href = "/datasets";
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}