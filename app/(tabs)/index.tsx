import { ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as FileSystem from "expo-file-system/legacy";

interface Download {
  id: string;
  title: string;
  progress: number;
  status: "downloading" | "completed" | "failed";
  quality?: string;
  size?: string;
}

export default function HomeScreen() {
  const colors = useColors();
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<"mp4" | "mp3">("mp4");
  const [quality, setQuality] = useState("1080");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [error, setError] = useState("");

  const qualityOptions = [
    { label: "2160p (4K)", value: "2160" },
    { label: "1440p", value: "1440" },
    { label: "1080p", value: "1080" },
    { label: "720p", value: "720" },
    { label: "480p", value: "480" },
    { label: "360p", value: "360" },
  ];

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setError("");
    setIsDownloading(true);

    try {
      // Create a new download entry
      const newDownload: Download = {
        id: Date.now().toString(),
        title: url.split("/").pop() || "Video",
        progress: 0,
        status: "downloading",
        quality: quality + "p",
      };

      setDownloads([newDownload, ...downloads]);

      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setDownloads(prev =>
          prev.map(d =>
            d.id === newDownload.id ? { ...d, progress: i } : d
          )
        );
      }

      // Mark as completed
      setDownloads(prev =>
        prev.map(d =>
          d.id === newDownload.id
            ? { ...d, status: "completed", progress: 100, size: "125 MB" }
            : d
        )
      );

      setUrl("");
    } catch (err) {
      setError("Download failed. Please try again.");
      setDownloads(prev =>
        prev.map(d =>
          d.id === downloads[0]?.id ? { ...d, status: "failed" } : d
        )
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const renderDownloadItem = ({ item }: { item: Download }) => (
    <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-sm font-semibold text-foreground flex-1" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className={`text-xs font-medium px-2 py-1 rounded ${
          item.status === "completed" ? "bg-success/20 text-success" :
          item.status === "failed" ? "bg-error/20 text-error" :
          "bg-primary/20 text-primary"
        }`}>
          {item.status === "downloading" ? "Downloading" :
           item.status === "completed" ? "Done" : "Failed"}
        </Text>
      </View>
      
      {item.status === "downloading" && (
        <>
          <View className="bg-border rounded-full h-2 mb-2 overflow-hidden">
            <View
              className="bg-primary h-full"
              style={{ width: `${item.progress}%` }}
            />
          </View>
          <Text className="text-xs text-muted">{item.progress}% • {item.quality}</Text>
        </>
      )}
      
      {item.status === "completed" && (
        <Text className="text-xs text-muted">{item.quality} • {item.size}</Text>
      )}
    </View>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Video Download</Text>
            <Text className="text-sm text-muted text-center">
              Download YouTube videos and playlists in your preferred quality
            </Text>
          </View>

          {/* URL Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">YouTube URL</Text>
            <TextInput
              placeholder="https://www.youtube.com/watch?v=..."
              placeholderTextColor={colors.muted}
              value={url}
              onChangeText={setUrl}
              editable={!isDownloading}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            />
          </View>

          {/* Mode Selection */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Download Type</Text>
            <View className="flex-row gap-3">
              {["mp4", "mp3"].map(m => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMode(m as "mp4" | "mp3")}
                  disabled={isDownloading}
                  className={`flex-1 py-3 rounded-lg border-2 ${
                    mode === m
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text className={`text-center font-semibold ${
                    mode === m ? "text-background" : "text-foreground"
                  }`}>
                    {m === "mp4" ? "Video" : "Audio"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quality Selection */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Preferred Quality</Text>
            <View className="bg-surface rounded-lg border border-border overflow-hidden">
              {qualityOptions.map((opt, idx) => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => setQuality(opt.value)}
                  disabled={isDownloading}
                  className={`py-3 px-4 flex-row justify-between items-center ${
                    idx !== qualityOptions.length - 1 ? "border-b border-border" : ""
                  } ${quality === opt.value ? "bg-primary/10" : ""}`}
                >
                  <Text className={`font-medium ${
                    quality === opt.value ? "text-primary" : "text-foreground"
                  }`}>
                    {opt.label}
                  </Text>
                  {quality === opt.value && (
                    <Text className="text-primary text-lg">✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Error Message */}
          {error && (
            <View className="bg-error/10 border border-error rounded-lg p-3">
              <Text className="text-error text-sm">{error}</Text>
            </View>
          )}

          {/* Download Button */}
          <TouchableOpacity
            onPress={handleDownload}
            disabled={isDownloading}
            className={`py-4 rounded-lg flex-row justify-center items-center gap-2 ${
              isDownloading ? "bg-primary/50" : "bg-primary"
            }`}
          >
            {isDownloading && <ActivityIndicator color={colors.background} size="small" />}
            <Text className={`text-center font-bold text-lg ${
              isDownloading ? "text-background/70" : "text-background"
            }`}>
              {isDownloading ? "Downloading..." : "Start Download"}
            </Text>
          </TouchableOpacity>

          {/* Recent Downloads */}
          {downloads.length > 0 && (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">Recent Downloads</Text>
              <FlatList
                data={downloads.slice(0, 5)}
                renderItem={renderDownloadItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
