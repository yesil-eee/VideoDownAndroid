import { ScrollView, Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface DownloadedFile {
  id: string;
  title: string;
  quality: string;
  size: string;
  date: string;
  type: "video" | "audio";
}

export default function DownloadsScreen() {
  const colors = useColors();
  const [downloads, setDownloads] = useState<DownloadedFile[]>([
    {
      id: "1",
      title: "How to Learn React in 2024",
      quality: "1080p",
      size: "245 MB",
      date: "Today",
      type: "video",
    },
    {
      id: "2",
      title: "Web Development Tutorial",
      quality: "720p",
      size: "128 MB",
      date: "Yesterday",
      type: "video",
    },
    {
      id: "3",
      title: "Podcast Episode 42",
      quality: "320kbps",
      size: "45 MB",
      date: "2 days ago",
      type: "audio",
    },
  ]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Download",
      "Are you sure you want to delete this file?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setDownloads(downloads.filter(d => d.id !== id));
          },
        },
      ]
    );
  };

  const renderDownloadItem = ({ item }: { item: DownloadedFile }) => (
    <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-foreground mb-1" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-xs text-muted">
            {item.quality} • {item.size} • {item.date}
          </Text>
        </View>
        <View className="bg-primary/10 rounded-full px-2 py-1 ml-2">
          <Text className="text-xs font-medium text-primary">
            {item.type === "video" ? "📹" : "🎵"}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-2">
        <TouchableOpacity className="flex-1 bg-primary/10 rounded-lg py-2">
          <Text className="text-center text-xs font-semibold text-primary">Play</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-primary/10 rounded-lg py-2">
          <Text className="text-center text-xs font-semibold text-primary">Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          className="flex-1 bg-error/10 rounded-lg py-2"
        >
          <Text className="text-center text-xs font-semibold text-error">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="items-center gap-1 mb-2">
            <Text className="text-3xl font-bold text-foreground">Downloads</Text>
            <Text className="text-sm text-muted">
              {downloads.length} file{downloads.length !== 1 ? "s" : ""}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
              <Text className="text-xs text-muted mb-1">Total Size</Text>
              <Text className="text-lg font-bold text-foreground">418 MB</Text>
            </View>
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
              <Text className="text-xs text-muted mb-1">Videos</Text>
              <Text className="text-lg font-bold text-foreground">2</Text>
            </View>
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
              <Text className="text-xs text-muted mb-1">Audio</Text>
              <Text className="text-lg font-bold text-foreground">1</Text>
            </View>
          </View>

          {/* Downloads List */}
          {downloads.length > 0 ? (
            <View>
              <Text className="text-sm font-semibold text-foreground mb-3">Recent Files</Text>
              <FlatList
                data={downloads}
                renderItem={renderDownloadItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          ) : (
            <View className="flex-1 items-center justify-center py-12">
              <Text className="text-lg font-semibold text-foreground mb-2">No Downloads Yet</Text>
              <Text className="text-sm text-muted text-center">
                Start downloading videos from the Download tab
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
