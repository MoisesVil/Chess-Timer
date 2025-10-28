// index.jsx
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ChessTimer from "./chessTimer"; // import your timer component

export default function IndexPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [increment, setIncrement] = useState("0"); // default increment in seconds
  const [startGame, setStartGame] = useState(false);

  // Game options
  const gameOptions = [
    { label: "Normal Match (20 min)", seconds: 60*20 },
    { label: "Quick Match (10 min)", seconds: 60*10 },
    { label: "Blitz Match (5 min)", seconds: 60*5 },
  ];

  // Start game when button is clicked
  if (startGame && selectedGame) {
    return (
      <ChessTimer
        time={selectedGame.seconds}
        increment={parseInt(increment) || 0}
        goBack={() => {
          setStartGame(false);
          setSelectedGame(null);
          setIncrement("0");
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Game Type</Text>

      {/* Game Options (time in game) */}
      {gameOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.optionButton, selectedGame === option && styles.selectedButton]}
          onPress={() => setSelectedGame(option)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Increment Input */}
      <View style={styles.incrementContainer}>
        <Text style={styles.incrementLabel}>Increment (seconds):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={increment}
          onChangeText={setIncrement}
          placeholder="0"
          placeholderTextColor="#bbb"
        />

        {/* Start Game Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setStartGame(true)}
        >
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaf6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#3f51b5",
  },
  optionButton: {
    backgroundColor: "#5c6bc0",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 8,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  selectedButton: {
    backgroundColor: "#3f51b5",
  },
  optionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  incrementContainer: {
    marginTop: 30,
    width: "80%",
    alignItems: "center",
  },
  incrementLabel: {
    fontSize: 16,
    color: "#3f51b5",
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    width: "50%",
    borderColor: "#3f51b5",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
    backgroundColor: "#fff",
  },
  startButton: {
    backgroundColor: "#3f51b5",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});