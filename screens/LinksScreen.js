import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       
      <ExpoLinksView />
      */}
      <Text>links pabe content comes here</Text>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  headerTitle: "Link",
  headerRight: (
    <Button
      onPress={() => alert('This is a button!')}
      title="Info"
      color="green"
    />
  ),
  headerLeft: (
    <Button
      onPress={() => alert('This is a go back!')}
      title="<"
      color="green"
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
