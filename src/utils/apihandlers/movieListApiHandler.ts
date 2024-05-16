import {setLoading, setData, setError} from '../../store/slices/moviesListApi';
import {RootState, AppDispatch} from '../../store/store';
import {FETCH_MOVIES_LIST_API_BASE_URL} from '../constants';

// Asynchronous action creator for fetching movie list API call
export const fetchMoviesList =
  (pageNumber: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    // dispatch(setLoading(true));
    const {token} = getState().userAuthDetails;
    const currLang = getState().language.selectedLanguage;

    type LangMap = {
      [key: string]: string;
    };

    let langMap: LangMap = {en: 'en-US', ab: 'ar'};

    let url = `${FETCH_MOVIES_LIST_API_BASE_URL}?language=${langMap[currLang]}&page=${pageNumber}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      dispatch(setData(data.results));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
