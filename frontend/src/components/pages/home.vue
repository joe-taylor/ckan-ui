<template>
  <v-container splash-container fluid align-center justify-center fill-height class="raise">
    <v-dialog
        v-model="cardDialog">

        <v-card class="card-card">
            <v-card-title class="header">
                <span>{{$tc('File Types')}}</span>
                <v-spacer></v-spacer>
                <v-btn text small depressed class="noHover closeButton" @click="cardDialog = false"><v-icon color="text">mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <h3>{{$tc('Open Standard Data')}}</h3>
                <div><span class="bold">json</span> {{$tc('JavaScript Object Notation standard data file')}}</div>
                <div><span class="bold">openapi-json</span> {{$tc('OpenAPI that returns data in JSON format')}}</div>
                <br />

                <h4>{{$tc('Geospatial Data')}}</h4>
                <div><span class="bold">arcgis_rest</span> {{$tc('ArcGIS REST API')}}</div>
                <div><span class="bold">e00</span> {{$tc('ESRI ArcInfo interchange file')}}</div>
                <div><span class="bold">fgdb</span> {{$tc('ESRI File Geodatabase format')}}</div>
                <div><span class="bold">geojson</span> {{$tc('Open standard format representing simple geographical features')}}</div>
                <div><span class="bold">kml</span> {{$tc('Google Earth file')}}</div>
                <div><span class="bold">kmz</span> {{$tc('Keyhole Markup Language')}}</div>
                <div><span class="bold">shp</span> {{$tc('ESRI Shapefile')}}</div>
                <div><span class="bold">wms</span> {{$tc('Web Map Service')}}</div>
                <br />

                <h3>{{$tc('Tabular Data')}}</h3>
                <div><span class="bold">csv</span> {{$tc('Comma Separated Value')}}</div>
                <div><span class="bold">xls</span> {{$tc('Microsoft Excel (97-2003)')}}</div>
                <div><span class="bold">xlsx</span> {{$tc('Microsoft Excel (2007)')}}</div>
                <br />

                <h3>{{$tc('Documents')}}</h3>
                <div><span class="bold">html</span> {{$tc('Hypertext Markup Language')}}</div>
                <div><span class="bold">pdf</span> {{$tc('Portable Document Format')}}</div>
                <div><span class="bold">txt</span> {{$tc('Plain Text')}}t</div>
                <div><span class="bold">xml</span> {{$tc('Extensible Markup Language')}}</div>
                <br />

                <h3>{{$tc('Archives')}}</h3>
                <div><span class="bold">zip</span> {{$tc('Compressed Archive File')}}</div>
                <br />
            </v-card-text>
        </v-card>

    </v-dialog>

        <v-row>
            <v-col cols=12>
                <v-row align="center" justify="center">
                    <v-card to="./datasets" class="mx-3 pitch-card" height="180px" width="160px" >
                        <v-container py-0>
                            <v-row class="pitch-header" align-content="center">
                                <v-col cols=12>
                                    <h3 class="pitch-title">{{$tc('Browse thousands of government datasets')}}</h3>
                                </v-col>
                            </v-row>
                            <v-row align-content="center" class="pitch-lower">
                                <v-col cols=12>
                                    <v-icon color="data_background" size=100 class="mt-12 watermark-icon">mdi-chart-donut</v-icon>
                                    <v-icon color="govYellow" class="yellow-icon" x-large>mdi-chart-donut</v-icon>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                    <v-card class="mx-3 hover pitch-card" @click="cardDialog=true" height="180px" width="160px" >
                        <v-container py-0>
                            <v-row class="pitch-header" align-content="center">
                                <v-col cols=12>
                                    <h3 class="pitch-title">{{$tc('Access data in a wide variety of file formats')}}</h3>
                                </v-col>
                            </v-row>
                            <v-row align-content="center" class="pitch-lower">
                                <v-col cols=12>
                                    <v-icon color="data_background" size=100 class="mt-12 watermark-icon">mdi-cloud-download-outline</v-icon>
                                    <v-icon color="govYellow" class="yellow-icon" x-large>mdi-cloud-download-outline</v-icon>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                    <v-card class="mx-3 pitch-card" :href="decodeURI(logInUrl)" height="180px" width="160px" >
                        <v-container py-0>
                            <v-row class="pitch-header" align-content="center">
                                <v-col cols=12>
                                    <h3 class="pitch-title">{{$tc('Login with IDIR and gain access to even more data')}}</h3>
                                </v-col>
                            </v-row>
                            <v-row align-content="center" class="pitch-lower">
                                <v-col cols=12>
                                    <v-icon color="data_background" size=100 class="mt-12 watermark-icon">mdi-account-details</v-icon>
                                    <v-icon color="govYellow" class="yellow-icon" x-large>mdi-account-details</v-icon>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols=12>
                <v-row align="center" justify="center">
                    <v-col xs="12" md="8">
                        <v-text-field
                            class="home-search mx-auto"
                            ref="searchBox"
                            solo
                            hide-details
                            background-color="text_background"
                            color="home_label"
                            append-icon="mdi-magnify"
                            v-model="searchText" :label="$tc('SearchDatasets')"
                            v-on:keyup="search"
                            @click:append="search">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols=12>
                <p class="search-suggestion mb-0 mx-auto">{{$tc('TrySearchingFor')}}</p>
                <v-carousel interval="3000" cycle xs6 :show-arrows="false" hide-delimiters height="40px" class="search-suggestion mx-auto" :key="'carousel-'+redrawIndex">
                    <v-carousel-item v-for="(item, i) in searchSuggestions" :key="i">
                        <p><a v-on:click="termClick" class="search-suggestion shadow">{{item}}</a></p>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>

    import {Analytics} from '../../services/analytics'
    const analyticsServ = new Analytics()

    import { mapState } from "vuex";

  export default{
      data () {
        return {
          logInUrl: "/client-api/login?r=/",
          cardDialog: false,
          searchText: "",
          redrawIndex: 0,
        }
      },

      computed: {
        ...mapState({
            searchSuggestions: state => state.search.landingTerms,
        })
      },

      watch: {
          searchSuggestions: function(){
              this.redrawIndex++;
          }
      },

      methods:{
        search: function(e){
            if (e.keyCode === 13 || e.type === 'click') {
              this.$store.commit('search/setSearchTextAndRedirect', this.searchText);                
            }
        },
        termClick: function(e){
            this.searchText=e.srcElement.innerText
            this.$refs.searchBox.focus()
        }
      },
      mounted() {
          this.$store.dispatch('search/getLandingTerms');
          analyticsServ.get(window.currentUrl, this.$route.meta.title, window.previousUrl);
      }
  }

</script>

<style>
    div.v-carousel__item{
        background: none !important;
    }

    div.v-carousel{
        box-shadow: none;
    }
</style>

<style scoped>
    .hover{
        cursor: pointer;
    }

    .card-card {
        background-color: var(--v-data_background-base) !important;
    }

    .header{
        background: var(--v-menu_secondary-base);
        color: var(--v-text-base);
        font-size: 16px;
        font-weight: normal;
    }

    .cardD{
        background: white;
    }

    span.bold{
        font-weight: bold;
    }

    a,p{
        /* color: white !important; */
        font-size: 20px;
        text-align: center;
    }
    .raise {
        margin-bottom: 45px;
    }
    .pitch-card {
        border-radius: 5px !important;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
    }
    .home-search {
        border-radius: 3px;
        border: 2px solid var(--v-primary-base);
        max-width: 720px;
    }
    .search-suggestion {
        font-size: 23px;
        color: var(--v-text-base);
        max-width: 720px;
    }
    .shadow {
        text-shadow: 0px 0px 16px rgba(0, 0, 0, 0.4);
    }
    .splash-container {
        background-image: url("../../assets/images/summer_background.jpg");
        background-size: cover;
    }
    .pitch-header {
        background-color: var(--v-menu_secondary-base);
        height: 120px;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }
    .pitch-title {
        color: var(--v-text-base);
        font-size: 16px;
        text-align: center;
    }
    .pitch-lower {
        text-align: center;
        height: 60px;
        overflow: hidden;
        text-overflow: clip;
    }
    .watermark-icon {
        opacity: 68%;
    }
    .yellow-icon {
        margin-left: -100px;
    }
</style>
