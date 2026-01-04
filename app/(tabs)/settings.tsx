import { ScrollView, Text, View, TouchableOpacity, Switch, Alert } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function SettingsScreen() {
  const colors = useColors();
  const [defaultQuality, setDefaultQuality] = useState("1080");
  const [downloadMode, setDownloadMode] = useState<"mp4" | "mp3">("mp4");
  const [autoRetry, setAutoRetry] = useState(true);
  const [concurrentDownloads, setConcurrentDownloads] = useState(2);

  const qualityOptions = [
    { label: "2160p (4K)", value: "2160" },
    { label: "1440p", value: "1440" },
    { label: "1080p", value: "1080" },
    { label: "720p", value: "720" },
    { label: "480p", value: "480" },
  ];

  const SettingRow = ({
    label,
    description,
    onPress,
  }: {
    label: string;
    description?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-surface rounded-lg p-4 mb-3 border border-border"
    >
      <Text className="text-sm font-semibold text-foreground">{label}</Text>
      {description && <Text className="text-xs text-muted mt-1">{description}</Text>}
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="items-center gap-1">
            <Text className="text-3xl font-bold text-foreground">Settings</Text>
            <Text className="text-sm text-muted">Customize your download preferences</Text>
          </View>

          {/* Download Preferences */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-3">Download Preferences</Text>

            {/* Default Quality */}
            <View className="bg-surface rounded-lg border border-border overflow-hidden mb-3">
              <View className="px-4 py-3 border-b border-border">
                <Text className="text-sm font-semibold text-foreground">Default Quality</Text>
                <Text className="text-xs text-muted mt-1">
                  Preferred resolution for new downloads
                </Text>
              </View>
              {qualityOptions.map((opt, idx) => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => setDefaultQuality(opt.value)}
                  className={`px-4 py-3 flex-row justify-between items-center ${
                    idx !== qualityOptions.length - 1 ? "border-b border-border" : ""
                  } ${defaultQuality === opt.value ? "bg-primary/10" : ""}`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      defaultQuality === opt.value ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {opt.label}
                  </Text>
                  {defaultQuality === opt.value && (
                    <Text className="text-primary text-lg">✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Download Mode */}
            <View className="bg-surface rounded-lg border border-border overflow-hidden mb-3">
              <View className="px-4 py-3 border-b border-border">
                <Text className="text-sm font-semibold text-foreground">Default Mode</Text>
                <Text className="text-xs text-muted mt-1">Video or audio download</Text>
              </View>
              {["mp4", "mp3"].map((mode, idx) => (
                <TouchableOpacity
                  key={mode}
                  onPress={() => setDownloadMode(mode as "mp4" | "mp3")}
                  className={`px-4 py-3 flex-row justify-between items-center ${
                    idx === 0 ? "border-b border-border" : ""
                  } ${downloadMode === mode ? "bg-primary/10" : ""}`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      downloadMode === mode ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {mode === "mp4" ? "Video (MP4)" : "Audio (MP3)"}
                  </Text>
                  {downloadMode === mode && (
                    <Text className="text-primary text-lg">✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Concurrent Downloads */}
            <View className="bg-surface rounded-lg p-4 border border-border mb-3">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">
                    Concurrent Downloads
                  </Text>
                  <Text className="text-xs text-muted mt-1">
                    Number of simultaneous downloads
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => setConcurrentDownloads(Math.max(1, concurrentDownloads - 1))}
                    className="bg-primary/10 w-8 h-8 rounded-lg items-center justify-center"
                  >
                    <Text className="text-primary font-bold">−</Text>
                  </TouchableOpacity>
                  <View className="w-8 h-8 rounded-lg bg-primary/20 items-center justify-center">
                    <Text className="text-primary font-bold">{concurrentDownloads}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setConcurrentDownloads(Math.min(5, concurrentDownloads + 1))}
                    className="bg-primary/10 w-8 h-8 rounded-lg items-center justify-center"
                  >
                    <Text className="text-primary font-bold">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Advanced Settings */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-3">Advanced Settings</Text>

            {/* Auto Retry */}
            <View className="bg-surface rounded-lg p-4 border border-border mb-3 flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-semibold text-foreground">Auto Retry</Text>
                <Text className="text-xs text-muted mt-1">
                  Automatically retry failed downloads
                </Text>
              </View>
              <Switch
                value={autoRetry}
                onValueChange={setAutoRetry}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>

            {/* Load Cookies */}
            <SettingRow
              label="Load Cookies"
              description="Import cookies from browser for age-restricted content"
              onPress={() => Alert.alert("Load Cookies", "Feature coming soon")}
            />

            {/* Clear Cache */}
            <SettingRow
              label="Clear Cache"
              description="Remove cached video metadata"
              onPress={() =>
                Alert.alert("Clear Cache", "Cache cleared successfully", [
                  { text: "OK", style: "default" },
                ])
              }
            />
          </View>

          {/* About */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-3">About</Text>

            <View className="bg-surface rounded-lg p-4 border border-border">
              <View className="mb-4 pb-4 border-b border-border">
                <Text className="text-sm text-muted">Version</Text>
                <Text className="text-base font-semibold text-foreground mt-1">1.0.0</Text>
              </View>

              <View className="mb-4 pb-4 border-b border-border">
                <Text className="text-sm text-muted">Developer</Text>
                <Text className="text-base font-semibold text-foreground mt-1">
                  Video Download Team
                </Text>
              </View>

              <View>
                <Text className="text-sm text-muted">Built with</Text>
                <Text className="text-base font-semibold text-foreground mt-1">
                  React Native & Expo
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="py-4">
            <Text className="text-xs text-muted text-center">
              © 2024 Video Download. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
