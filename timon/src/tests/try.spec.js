import { rootReducer, initialState } from '../reducers';


describe('Articles reducer', () => {
    it('return the initial state', () => {
        expect(rootReducer(undefined, {})).toEqual(initialState)
    })

    it('articles get request without err', () => {
        const action = {
            type: "REQUEST_ARTICLES",
            isFetching: true,
            error: false
        }

        expect(rootReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: true,
            error: false,
        })
    })


    it('request articles after request with err', () => {
        const initiaStateWithErr = {
            content: {},
            topNews: {},
            isFetching: false,
            error: true,
            light: false,
        }

        const action = {
            type: "REQUEST_ARTICLES",
            isFetching: true,
            error: false
        }

        expect(rootReducer(initiaStateWithErr, action)).toEqual({
            ...initiaStateWithErr,
            isFetching: true,
            error: false,
        })
    })

})