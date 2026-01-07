# VideoDownAndroid APK Oluşturma Rehberi

Bu rehber, VideoDownAndroid uygulamasının Android APK dosyasını oluşturmak için adım adım talimatlar içerir.

## Yöntem 1: Expo Build Service (Önerilir - En Kolay)

### Gerekli Yazılımlar
- **Expo CLI** (zaten kurulu)
- **Expo Hesabı** ([expo.dev](https://expo.dev) adresinde ücretsiz oluşturun)

### Adımlar

1. **Expo'ya giriş yapın:**
   ```bash
   eas login
   ```
   E-posta ve şifrenizi girin.

2. **APK'yı derleyin:**
   ```bash
   cd VideoDownAndroid
   eas build --platform android
   ```

3. **Derleme işlemi başlayacaktır:**
   - Expo cloud'da derlenecek
   - Derlemesi tamamlandığında, indirme linki verilecek
   - Derleme süresi: 10-30 dakika

4. **APK dosyasını indirin:**
   - Verilen linki tarayıcıda açın
   - `VideoDownAndroid-production.apk` dosyasını indirin

## Yöntem 2: Local Build (Gelişmiş)

### Gerekli Yazılımlar
- **Java Development Kit (JDK) 17+**
- **Android SDK**
- **Gradle**
- **Node.js 18+**

### Adım 1: Java JDK'yı Yükleyin

**Windows:**
1. [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) adresinden JDK 17+ indirin
2. Kurulum dosyasını çalıştırın
3. Kurulum tamamlandığında, `JAVA_HOME` ortam değişkenini ayarlayın

**macOS:**
```bash
brew install openjdk@17
```

**Linux:**
```bash
sudo apt-get install openjdk-17-jdk
```

### Adım 2: Android SDK'yı Yükleyin

**Windows:**
1. [Android Studio](https://developer.android.com/studio) indirin
2. Kurulum dosyasını çalıştırın
3. Android Studio açılacak ve SDK'yı indirmeyi teklif edecek
4. `ANDROID_HOME` ortam değişkenini ayarlayın:
   ```
   ANDROID_HOME=C:\Users\<YourUsername>\AppData\Local\Android\Sdk
   ```

**macOS:**
```bash
brew install android-sdk
export ANDROID_HOME=/usr/local/share/android-sdk
```

**Linux:**
```bash
sudo apt-get install android-sdk
export ANDROID_HOME=$HOME/Android/Sdk
```

### Adım 3: Gradle'ı Yükleyin

**Windows/macOS/Linux:**
```bash
# Gradle wrapper otomatik olarak indirilecek
# Veya manuel olarak yükleyin:
brew install gradle  # macOS
sudo apt-get install gradle  # Linux
```

### Adım 4: Projeyi Hazırlayın

```bash
cd VideoDownAndroid
npm install
# veya
pnpm install
```

### Adım 5: APK'yı Derleyin

```bash
# Development APK (debug)
eas build --platform android --local --profile development

# Production APK (release)
eas build --platform android --local --profile production
```

### Adım 6: APK Dosyasını Bulun

Derleme tamamlandığında, APK dosyası şu konumda olacaktır:

```
VideoDownAndroid/android/app/build/outputs/apk/release/app-release.apk
```

## Yöntem 3: Expo Go ile Test Etme (Derleme Olmadan)

### Adımlar

1. **Telefonda Expo Go Uygulamasını Yükleyin:**
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) adresinden
   - [Apple App Store](https://apps.apple.com/app/expo-go/id982107779) adresinden

2. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   cd VideoDownAndroid
   npm run dev
   # veya
   pnpm dev
   ```

3. **QR Kodunu Tarayın:**
   - Terminal'de gösterilen QR kodunu Expo Go ile tarayın
   - Uygulama anında yüklenecek

## APK Dosyasını Cihazda Yükleme

### Android Cihaza Yükleme

1. **USB Debugging'i Etkinleştirin:**
   - Ayarlar → Geliştirici Seçenekleri → USB Debugging

2. **APK Dosyasını Yükleyin:**
   ```bash
   adb install VideoDownAndroid-production.apk
   ```

3. **Veya Manuel Olarak:**
   - APK dosyasını cihaza kopyalayın
   - Dosya Yöneticisinde açın
   - Yüklemeyi onaylayın

## APK Dosyasını İmzalama (Opsiyonel)

Uygulamayı Google Play Store'da yayınlamak için imzalama gereklidir:

```bash
# Keystore dosyası oluşturun (ilk kez)
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias

# APK'yı imzalayın
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore my-release-key.keystore VideoDownAndroid-production.apk my-key-alias

# Zipalign ile optimize edin
zipalign -v 4 VideoDownAndroid-production.apk VideoDownAndroid-production-aligned.apk
```

## Sorun Giderme

### "Java not found" Hatası
```bash
# Java'nın kurulu olduğunu kontrol edin
java -version

# JAVA_HOME ortam değişkenini ayarlayın
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64  # Linux
```

### "Android SDK not found" Hatası
```bash
# ANDROID_HOME ortam değişkenini ayarlayın
export ANDROID_HOME=$HOME/Android/Sdk  # Linux/macOS
set ANDROID_HOME=C:\Users\<YourUsername>\AppData\Local\Android\Sdk  # Windows
```

### "Gradle build failed" Hatası
1. Gradle cache'i temizleyin:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. Node modules'ü yeniden yükleyin:
   ```bash
   rm -rf node_modules
   npm install
   ```

### APK Çok Büyük
- Uygulamada kullanılmayan bağımlılıkları kaldırın
- Resim ve video dosyalarını optimize edin
- Proguard/R8 ile kod küçültme etkinleştirin

## APK Dosyasının Boyutu

Oluşturulan APK dosyası yaklaşık **50-100 MB** boyutunda olacaktır:
- React Native runtime: ~30 MB
- Expo SDK: ~20 MB
- Bağımlılıklar: ~10 MB
- Uygulama kodu: ~5 MB

## Daha Fazla Bilgi

- [Expo Build Belgeleri](https://docs.expo.dev/build/introduction/)
- [React Native Belgeleri](https://reactnative.dev/)
- [Android Belgeleri](https://developer.android.com/)
- [Gradle Belgeleri](https://gradle.org/guides/)

## Lisans ve Telif Hakkı

Bu uygulama MIT Lisansı altında yayınlanmıştır. Daha fazla bilgi için `LICENSE` dosyasını okuyun.
