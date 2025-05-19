import {
  extractEpisodeIdsFromUrls,
  getCharacterById,
  getEpisodesByIds,
} from "@/api/rickAndMortyAPI";
import useApiData from "@/hooks/useApiData";
import { Character, Episode } from "@/types/api";
import { Link, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  // ScrollView, // Ya no se necesita como contenedor principal
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams();
  const characterId = typeof id === "string" ? parseInt(id, 10) : undefined;

  const {
    data: character,
    loading: loadingCharacter,
    error: errorCharacter,
  } = useApiData<Character>(
    characterId !== undefined ? getCharacterById(characterId) : null
  );

  const episodeIds = useMemo(() => {
    console.log("character?.episode", character?.episode);
    return character?.episode
      ? extractEpisodeIdsFromUrls(character.episode)
      : [];
  }, [character?.episode]);

  const {
    data: episodesArray,
    loading: loadingEpisodes,
    error: errorEpisodes,
  } = useApiData<Episode[]>(
    episodeIds.length > 0 ? getEpisodesByIds(episodeIds) : null
  );

  if (loadingCharacter || loadingEpisodes) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando detalles...</Text>
      </View>
    );
  }

  if (errorCharacter || errorEpisodes) {
    const errorMessage = errorCharacter
      ? errorCharacter.message
      : errorEpisodes?.message;
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error al cargar detalles: {errorMessage}
        </Text>
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Personaje no encontrado.</Text>
      </View>
    );
  }

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Image source={{ uri: character!.image }} style={styles.image} />
      <Text style={styles.name}>{character!.name}</Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Especie:</Text> {character!.species}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Origen:</Text> {character!.origin.name}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Ubicación:</Text> {character!.location.name}
      </Text>
      <Text style={styles.episodesTitle}>Episodios (últimos 5):</Text>
      {loadingEpisodes && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );

  const renderEmptyListComponent = () => (
    <Text style={styles.detailText}>No aparece en episodios conocidos.</Text>
  );

  return (
    <FlatList
      data={
        !loadingEpisodes && episodesArray && episodesArray.length > 0
          ? episodesArray.sort((a, b) => a.id - b.id).slice(-5)
          : []
      }
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: episode }) => (
        <Link
          href={{
            pathname: "/(tabs)/episode/[episodeId]",
            params: { episodeId: episode.id },
          }}
          asChild
        >
          <TouchableOpacity style={styles.episodeItem}>
            <Text style={styles.episodeText}>
              {episode.episode} - {episode.name}
            </Text>
          </TouchableOpacity>
        </Link>
      )}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={!loadingEpisodes ? renderEmptyListComponent : null}
      style={styles.flatListContainer}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
  },
  episodesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  episodeItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  episodeText: {
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
  },
});
