import { getCharacters } from "@/api/rickAndMortyAPI";
import CharacterCard from "@/components/CharacterCard";
import SearchInput from "@/components/SearchInput";
import useApiData from "@/hooks/useApiData";
import { ApiResponse, Character } from "@/types/api";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useApiData<ApiResponse<Character>>(
    getCharacters(page, searchQuery)
  );

  useEffect(() => {
    if (data?.results) {
      if (searchQuery && page === 1) {
        setAllCharacters(data.results);
      } else {
        // Filtrar personajes que ya existen en allCharacters antes de añadir los nuevos
        setAllCharacters((prevCharacters) => {
          const existingIds = new Set(prevCharacters.map((c) => c.id));
          const newCharacters = data.results.filter(
            (c) => !existingIds.has(c.id)
          );
          return [...prevCharacters, ...newCharacters];
        });
      }
    } else if (
      data &&
      data.results &&
      data.results.length === 0 &&
      searchQuery &&
      page === 1
    ) {
      // Si es una búsqueda y no hay resultados, limpiar la lista.
      setAllCharacters([]);
    }
    // No limpiar allCharacters si data es null o undefined durante la carga inicial de una nueva página
    // ya que eso borraría los personajes de páginas anteriores.
  }, [data, searchQuery, page]);

  const loadMoreCharacters = () => {
    if (data?.info.next && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setAllCharacters([]);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error al cargar los personajes: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchInput onSearch={handleSearch} />
      {allCharacters.length === 0 && !loading && searchQuery ? (
        <Text style={styles.noResultsText}>
          {`No se encontraron personajes para "${searchQuery}"`}
        </Text>
      ) : (
        <FlatList
          data={allCharacters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CharacterCard character={item} />}
          onEndReached={loadMoreCharacters}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
      )}
      {loading &&
        !searchQuery &&
        page === 1 && ( // Show initial loading only
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.initialLoading}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#666",
  },
  initialLoading: {
    marginTop: 20,
  },
});
