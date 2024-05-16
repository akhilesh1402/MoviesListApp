// import { View, Text } from 'react-native'
// import React from 'react'

// const Movies: React.FC = () => {
//     return (
//         <View>
//             <Text>Movies</Text>
//         </View>
//     )
// }

// export default Movies;


import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchMoviesList } from '../../utils/apihandlers/movieListApiHandler';

type ListItem = {
    id: string;
    title: string;
    imageUrl: string;
}

const Movies: React.FC = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.moviesListApi.loading);
    const data = useSelector((state: RootState) => state.moviesListApi.data);
    const apiError = useSelector((state: RootState) => state.moviesListApi.error);
    const token = useSelector((state: RootState) => state.userAuthDetails.token);

    const [page, setPage] = useState(1);

    function isObjectEmpty(obj: {}) {
        return Object.keys(obj).length === 0;
    }

    const responseData: ListItem[] = !isObjectEmpty(data) ? data.map((item: any) => {
        return {
            id: item.id,
            title: item.title,
            imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`
        }
    }) : [];

    useEffect(() => {
        if (token) {
            dispatch(fetchMoviesList(page) as any);
        }
    }, [dispatch, token, page]);

    const renderItem = ({ item }: { item: ListItem }) => (
        <View style={styles.movieCont}>
            <Image style={styles.imageCont} source={{ uri: item.imageUrl }} resizeMode='cover' />
            <View style={{ flex: 1, justifyContent: "center" }}><Text numberOfLines={4} style={styles.movieTitle}>{item.title}</Text></View>
        </View>
    );

    const loadNextPage = () => {
        setPage(page + 1)
    }

    return (
        <View style={styles.container}>
            {loading && <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#11111190" />
            </View>}
            {!loading && <>
                {!apiError && <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    data={responseData}
                    renderItem={renderItem}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadNextPage}
                />}
                {apiError && <View style={styles.overlay}>
                    <Text style={styles.movieTitle}>{apiError}</Text>
                </View>}
            </>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
    },
    movieCont: {
        backgroundColor: "#11111120",
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        height: 250,
        width: "45%",
        borderWidth: 2,
        borderColor: "#11111120"
    },
    imageCont: {
        width: "100%",
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    movieTitle: {
        fontSize: 15,
        fontFamily: "Arial",
        paddingTop: 2,
        textAlign: 'left',
        fontWeight: "bold",
        paddingHorizontal: 10,
        flexWrap: "wrap"
    },
    overlay: {
        flex: 1,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Movies;  