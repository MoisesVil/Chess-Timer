import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ChessTimer({time, goBack}) {
  const [player1Time, setPlayer1Time] = useState(time); // time in seconds
  const [player2Time, setPlayer2Time] = useState(time);
  const [activePlayer, setActivePlayer] = useState(null); // "p1" or "p2"
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Handle countdown
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (activePlayer && !isPaused) {
      intervalRef.current = setInterval(() => {
        if (activePlayer === "p1") {
          setPlayer1Time((prev) => Math.max(prev - 1, 0));
        } else if (activePlayer === "p2") {
          setPlayer2Time((prev) => Math.max(prev - 1, 0));
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [activePlayer, isPaused]);

  // Format time mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Reset both timers
  const handleReset = () => {
    setPlayer1Time(time);
    setPlayer2Time(time);
    setActivePlayer(null);
    setIsPaused(false);
  };

  // Toggle pause/resume
  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  // Handle home (go back to menu)
  const handleHome = () => {
    goBack();
  };

  const isPlayer1Disabled = (activePlayer && activePlayer !== "p1") || isPaused || player1Time === 0;
  const isPlayer2Disabled = (activePlayer && activePlayer !== "p2") || isPaused || player2Time === 0;

  return (
    <View style={styles.container}>
      {/* Side Menu */}
      <View style={styles.sideMenu}>
        {/* Reset Button */}
        <TouchableOpacity style={styles.iconButton} onPress={handleReset}>
          <MaterialIcons name="restart-alt" size={36} color="#fff" />
        </TouchableOpacity>

        {/* Home Button */}
        <TouchableOpacity style={styles.iconButton} onPress={handleHome}>
          <FontAwesome name="home" size={36} color="#fff" />
        </TouchableOpacity>

        {/* Pause / Resume Button */}
        <TouchableOpacity style={styles.iconButton} onPress={handlePause}>
          {isPaused ? (
            <MaterialIcons name="play-arrow" size={36} color="#fff" />
          ) : (
            <MaterialIcons name="pause" size={36} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Timer Area */}
      <View style={styles.timerArea}>
        {/* Player 1 Timer */}
        <TouchableOpacity
          style={[styles.timer, styles.upsideDown, isPlayer1Disabled && styles.disabledTimer]}
          onPress={() => !isPaused && setActivePlayer("p2")}
          disabled={isPlayer1Disabled}
        >
          <Text style={styles.timerText}>{formatTime(player1Time)}</Text>
        </TouchableOpacity>

        {/* Optional paused indicator */}
        {isPaused && (
          <View style={styles.pausedIndicator}>
            <Text style={styles.pausedText}>PAUSED</Text>
          </View>
        )}

        {/* Player 2 Timer */}
        <TouchableOpacity
          style={[styles.timer, isPlayer2Disabled && styles.disabledTimer]}
          onPress={() => !isPaused && setActivePlayer("p1")}
          disabled={isPlayer2Disabled}
        >
          <Text style={styles.timerText}>{formatTime(player2Time)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e8eaf6",
  },
  sideMenu: {
    width: 100,
    backgroundColor: "#3f51b5",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconButton: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: "#5c6bc0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    transform: [{ rotate: "270deg" }],
  },
  menuButton: {
    width: 80,
    height: 80,
    backgroundColor: "#5c6bc0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  menuButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  timerArea: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 50,
  },
  timer: {
    width: 250,
    height: 180,
    backgroundColor: "#2196f3",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  disabledTimer: {
    backgroundColor: "#b0bec5",
  },
  timerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  upsideDown: {
    transform: [{ rotate: "180deg" }],
  },
  pausedIndicator: {
    backgroundColor: "#ff9800",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
  },
  pausedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});