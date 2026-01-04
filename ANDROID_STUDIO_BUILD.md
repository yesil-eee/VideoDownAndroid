# Android Studio'da VideoDownAndroid APK Derlemesi

Bu rehber, VideoDownAndroid projesini Android Studio'da açıp APK dosyasını derlemek için adım adım talimatlar içerir.

## Gerekli Yazılımlar

- **Android Studio** (en son sürüm önerilir)
- **Java Development Kit (JDK)** 17 veya daha yeni
- **Android SDK** API 34
- **Git** (proje klonlamak için)

## Adım 1: Projeyi Klonlayın

```bash
# Terminal/Command Prompt'ta çalıştırın
git clone https://github.com/yesil-eee/VideoDownAndroid.git
cd VideoDownAndroid
```

## Adım 2: Android Studio'yu Açın

1. Android Studio'yu başlatın
2. **File** → **Open** seçin
3. Klonladığınız `VideoDownAndroid` klasörünü seçin
4. **Open** butonuna tıklayın

## Adım 3: Gradle Senkronizasyonu

Android Studio projeyi açtığında otomatik olarak Gradle senkronizasyonunu başlatacaktır.

- Sağ üst köşede **Gradle sync** bildirimi görürseniz, **Sync Now** butonuna tıklayın
- İşlem tamamlanana kadar bekleyin (ilk kez biraz zaman alabilir)

## Adım 4: SDK Bileşenlerini Kontrol Edin

1. **File** → **Settings** (Windows/Linux) veya **Android Studio** → **Preferences** (macOS)
2. **Appearance & Behavior** → **System Settings** → **Android SDK** seçin
3. **SDK Platforms** sekmesinde:
   - ✓ **Android API 34** işaretli olduğundan emin olun
4. **SDK Tools** sekmesinde:
   - ✓ **Android SDK Build-Tools 34.0.0** işaretli olduğundan emin olun
   - ✓ **Android Emulator** (isteğe bağlı)
   - ✓ **Android SDK Platform-Tools** işaretli olduğundan emin olun
5. **Apply** → **OK** butonlarına tıklayın

## Adım 5: Native Dosyaları Oluşturun

Android Studio'nun Terminal sekmesini açın (alt kısım):

```bash
# Terminal'de çalıştırın
npx expo prebuild --clean
```

Bu komut React Native ve Expo için gerekli Android dosyalarını oluşturacaktır.

## Adım 6: APK Derleyin

### Debug APK (Test için):

1. **Build** menüsünü açın
2. **Build Bundle(s) / APK(s)** → **Build APK(s)** seçin
3. Derlemesi tamamlanana kadar bekleyin (5-10 dakika)
4. Tamamlandığında, **Locate** butonuna tıklayarak APK dosyasını bulabilirsiniz

**Konum:** `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (Dağıtım için):

1. **Build** menüsünü açın
2. **Generate Signed Bundle / APK** seçin
3. **APK** seçeneğini işaretleyin
4. **Next** butonuna tıklayın
5. Keystore oluşturun veya mevcut olanı seçin:
   - **New** butonuna tıklayın
   - Keystore dosyasını kaydetmek istediğiniz yeri seçin
   - **Key store password** girin (güçlü bir şifre kullanın)
   - **Key alias** olarak `videodownandroid` girin
   - **Key password** girin (keystore şifresiyle aynı olabilir)
   - **Validity** 25 yıl olarak bırakın
   - **OK** butonuna tıklayın
6. **Next** butonuna tıklayın
7. **Release** build variant'ını seçin
8. **Finish** butonuna tıklayın
9. Derlemesi tamamlanana kadar bekleyin

**Konum:** `android/app/build/outputs/apk/release/app-release.apk`

## Adım 7: APK Dosyasını Cihaza Yükleyin

### Fiziksel Cihaza (USB ile):

1. Android cihazınızı USB kablosuyla bilgisayara bağlayın
2. Cihazda **Geliştirici Seçenekleri** etkinleştirin:
   - **Ayarlar** → **Hakkında telefon** → **Yapı numarası**'na 7 kez dokunun
3. **Ayarlar** → **Geliştirici Seçenekleri** → **USB Hata Ayıklaması**'nı etkinleştirin
4. Android Studio'da **Run** → **Run 'app'** seçin veya **Shift + F10** tuşlarına basın
5. Cihazı seçin ve **OK** butonuna tıklayın

### Android Emülatörüne:

1. **Tools** → **Device Manager** seçin
2. Emülatörü başlatın (▶ butonuna tıklayın)
3. Android Studio'da **Run** → **Run 'app'** seçin
4. Emülatörü seçin ve **OK** butonuna tıklayın

## Adım 8: Uygulamayı Test Edin

APK yüklendikten sonra:

1. Cihazda **Video Download** uygulamasını bulun
2. Uygulamayı açın
3. YouTube URL'si girin ve test edin

## Sorun Giderme

### "Gradle sync failed"
- **File** → **Invalidate Caches** → **Invalidate and Restart** seçin
- Android Studio'yu yeniden başlatın

### "SDK not found"
- **SDK Manager**'da gerekli SDK'ları yükleyin
- ANDROID_HOME ortam değişkenini ayarlayın

### "Build failed: Insufficient memory"
- **File** → **Settings** → **Gradle** seçin
- **VM options** alanına `-Xmx4096m` ekleyin

### "Emulator won't start"
- **Device Manager**'da emülatörü silin ve yeniden oluşturun
- Bilgisayarınızda **Hyper-V** veya **KVM** etkinleştirildiğinden emin olun

### "USB debugging not working"
- Cihazı yeniden bağlayın
- Cihazda USB hata ayıklaması iznini onaylayın
- `adb devices` komutunu çalıştırarak cihazın listelenip listelenmediğini kontrol edin

## İleri Seviye: Komut Satırından Derleme

Terminal'de aşağıdaki komutları çalıştırabilirsiniz:

```bash
# Debug APK
cd android
./gradlew assembleDebug
# Çıktı: app/build/outputs/apk/debug/app-debug.apk

# Release APK
./gradlew assembleRelease
# Çıktı: app/build/outputs/apk/release/app-release.apk

# Cihaza yükle
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## Keystore Dosyasını Güvenli Tutun

Release APK'nı oluşturduktan sonra:

1. Keystore dosyasını güvenli bir yerde saklayın
2. Şifreyi not edin
3. Gelecekte güncellemeler yaparken aynı keystore'u kullanın

**Uyarı:** Keystore dosyasını kaybederseniz, aynı paket adı ile yeni APK yükleyemezsiniz!

## Google Play Store'a Yükleme

Release APK'yı oluşturduktan sonra:

1. [Google Play Console](https://play.google.com/console) açın
2. Yeni bir uygulama oluşturun
3. **Release** → **Production** seçin
4. Release APK'yı yükleyin
5. Uygulama bilgilerini doldurun
6. Gözden geçirme için gönderin

## Daha Fazla Bilgi

- [Android Studio Belgeleri](https://developer.android.com/studio/intro)
- [Gradle Build System](https://gradle.org/)
- [React Native Android Kurulum](https://reactnative.dev/docs/environment-setup)
- [Expo Android Derleme](https://docs.expo.dev/build/setup/)
