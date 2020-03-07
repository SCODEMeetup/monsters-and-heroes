<template>
    <Page>
        <ActionBar title="Monster and Heros" />
        <ScrollView>
            <StackLayout class="home-panel">
                <!--Add your page content here-->
                <Label textWrap="true" text="Play with NativeScript!"
                    class="h2 description-label" />
                <Label textWrap="true"
                    text="Write code in the editor or drag and drop components to build a NativeScript mobile application."
                    class="h2 description-label" />
                <Label textWrap="true" text="<Image src="
                    https://play.nativescript.org/dist/assets/img/NativeScript_logo.png" />
                Scan the QR code with your mobile device and watch the changes
                sync live while you play with the code." class="h2
                description-label" />
                <Image :src="cameraImage" id="image" stretch="aspectFit"
                    margin="10" />
                <TextView row="2" :text="labelText" editable="false">
                </TextView>
                <Button row="3" text="Take Picture" @tap="onTakePictureTap"
                    padding="10" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import {
        takePicture,
        requestPermissions
    } from "nativescript-camera";

    export default {
        data() {
            return {
                cameraImage: "https://play.nativescript.org/dist/assets/img/NativeScript_logo.png",
                labelText: "Test"
            };
        },
        methods: {
            onTakePictureTap: function(args) {
                let page = args.object.page;
                let that = this;
                requestPermissions().then(
                    () => {
                        takePicture({
                            width: that.width,
                            height: that.height,
                            keepAspectRatio: that
                                .keepAspectRatio,
                            saveToGallery: that.saveToGallery,
                            allowsEditing: that.allowsEditing
                        }).then(
                            imageAsset => {
                                that.cameraImage = imageAsset;
                                imageAsset.getImageAsync(function(
                                    nativeImage) {
                                    let scale = 1;
                                    let actualWidth = 0;
                                    let actualHeight = 0;
                                    if (imageAsset
                                        .android) {
                                        // get the current density of the screen (dpi) and divide it by the default one to get the scale
                                        scale =
                                            nativeImage
                                            .getDensity() /
                                            android.util
                                            .DisplayMetrics
                                            .DENSITY_DEFAULT;
                                        actualWidth =
                                            nativeImage
                                            .getWidth();
                                        actualHeight =
                                            nativeImage
                                            .getHeight();
                                    } else {
                                        scale =
                                            nativeImage
                                            .scale;
                                        actualWidth =
                                            nativeImage
                                            .size.width *
                                            scale;
                                        actualHeight =
                                            nativeImage
                                            .size.height *
                                            scale;
                                    }
                                    that.labelText =
                                        `Displayed Size: ${actualWidth}x${actualHeight} with scale ${scale}\n` +
                                        `Image Size: ${Math.round(
                                        actualWidth / scale
                                    )}x${Math.round(actualHeight / scale)}`;
                                    console.log(
                                        `${labelText}`
                                        );

                                    // that.$navigateTo(Confirm, {
                                    //     props: {
                                    //         capturedImage: imageAsset
                                    //     }
                                    // })
                                });
                            },
                            err => {
                                console.log("Error -> " + err
                                    .message);
                            }
                        );
                    },
                    () => alert("permissions rejected")
                );
            }
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>