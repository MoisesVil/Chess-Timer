// App.js or IndexPage.js
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChessTimer from "./chessTimer"; // import your timer component

export default function IndexPage() {
  const [selectedGame, setSelectedGame] = useState(null);

  // Define your game options
  const gameOptions = [
    { label: "Normal Match (20 min)", seconds: 60*20 },
    { label: "Quick Match (10 min)", seconds: 60*10 },
    { label: "Blitz Match (5 min)", seconds: 60*5 },
  ];

  if (selectedGame) {
    // Render ChessTimer with selected minutes
    return <ChessTimer time={selectedGame.seconds} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Game Type</Text>
      {gameOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => setSelectedGame(option)}
        >
          <Text style={styles.buttonText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "deepskyblue",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
