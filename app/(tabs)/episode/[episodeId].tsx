import { getEpisodesByIds } from "@/api/rickAndMortyAPI";
import useApiData from "@/hooks/useApiData";
import { Episode } from "@/types/api";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function EpisodeDetailScreen() {
  const { episodeId } = useLocalSearchParams();
  const id =
    typeof episodeId === "string" ? parseInt(episodeId, 10) : undefined;

  const {
    data: episode,
    loading,
    error,
  } = useApiData<Episode>(
    id !== undefined ? getEpisodesByIds([id]) : null // getEpisodesByIds can take a single ID in an array
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando detalles del episodio...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error al cargar detalles del episodio: {error.message}
        </Text>
      </View>
    );
  }

  if (!episode) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Episodio no encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Código:</Text> {episode.episode}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Fecha de Emisión:</Text> {episode.air_date}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
});
