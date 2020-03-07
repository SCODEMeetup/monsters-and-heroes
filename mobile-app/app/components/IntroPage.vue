<template>
    <Page>
        <ActionBar title="Heroes And Monsters" />

        <StackLayout>
            <BottomNavigation height="400px">
                <TabStrip>
                    <TabStripItem>
                        <Label text="Home"></Label>
                        <Image src="res://Home"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Monsters"></Label>
                        <Image src="res://Monsters"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Heroes"></Label>
                        <Image src="res://Heroes"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Settings"></Label>
                        <Image src="res://settings"></Image>
                    </TabStripItem>

                </TabStrip>
                <TabContentItem>
                    <ScrollView>
                        <StackLayout class="home-panel">

                            <Label textWrap="true"
                                text="Welcome to Monsters & Heroes!"
                                class="h2 description-label" />
                            <Label textWrap="true"
                                text="Start your adventure where you can earn points by declaring & defeating monsters as well as saluting the heroes."
                                class="h2 description-label" />
                            <Label textWrap="true"
                                text="Take pictures of street features and tag it as the appropriate hero or monster!"
                                class="h2 description-label" />

                            <Button class="map-it" text="Map It!" @tap="onMapTap" />
							<Button class="snap-it" text="Snap It!" @tap="onSnapTap" />
                        </StackLayout>
                    </ScrollView>
                </TabContentItem>
                <TabContentItem>
                    <StackLayout class="monster-panel" (tap)="onTappedFun()">
                        <Label text="Monster Attack!" class="h2 text-center">
                        </Label>

                        <ImageButton @button-clicked="onImageButtonTap" />

                        <Button
                            src="https://play.nativescript.org/dist/assets/img/NativeScript_logo.png"
                            @tap="onButtonTap" />
                        <Button text="Tire Eater" @tap="onTireEaterTap" />
                        <Button text="Button" @tap="onButtonTap">
                            <Image
                                src="https://play.nativescript.org/dist/assets/img/NativeScript_logo.png" />
                        </Button>

                        <Button text="Deluminator" @tap="onDeluminatorTap" />


                        <Button text="Ground Goblin"
                            @tap="onGroundGoblinTap" />


                        <Button text="Mangler" @tap="onManglerTap" />


                    </StackLayout>

                </TabContentItem>
                <TabContentItem>
                    <GridLayout>
                        <Label text="Salute the Hero!" class="h2 text-center">
                        </Label>
                    </GridLayout>
                </TabContentItem>
                <TabContentItem>
                    <GridLayout>
                        <Label text="Settings" class="h2 text-center">
                        </Label>
                    </GridLayout>
                </TabContentItem>
            </BottomNavigation>
        </StackLayout>
    </Page>
</template>

<script>
    import ImageButton from "./ImageButton";
    export default {
        components: {
            ImageButton
        },
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
            },
            onImageButtonTap() {
                console.log("Image Button was pressed");
            },
            onTappedFun() {
                console.log("Image was pressed");
            },
            onDeluminatorTap() {
                console.log("Deluminator was pressed");
            },
            onGroundGoblinTap() {
                console.log("Ground Goblin was pressed");
            },
            onManglerTap() {
                console.log("Mangler was pressed");
            },
            onTireEaterTap() {
                console.log("Tire Eater was pressed");
            }
        },

        data() {
            return {};
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

	 .map-it { 
         border-radius: 10rem; 
         border-width: 1rem; 
         color: white; 
         margin: 20rem; 
         margin-left: 50rem;
         margin-right: 50rem;
         padding: 20rem;
         font-size: 30rem; 
         border-color: #2b3c6a; 
         background-color: #3B5997; 
    }
</style>