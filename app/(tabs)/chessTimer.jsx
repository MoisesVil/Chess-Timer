import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ChessTimer({time}) {
  const [player1Time, setPlayer1Time] = useState(time); // time in seconds
  const [player2Time, setPlayer2Time] = useState(time);
  const [activePlayer, setActivePlayer] = useState(null); // "p1" or "p2"
  const intervalRef = useRef(null);

  // Handle countdown
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (activePlayer) {
      intervalRef.current = setInterval(() => {
        if (activePlayer === "p1") {
          setPlayer1Time((prev) => Math.max(prev - 1, 0));
        } else if (activePlayer === "p2") {
          setPlayer2Time((prev) => Math.max(prev - 1, 0));
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [activePlayer]);

  // Format time mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      {/* Player 1 Timer */}
      <TouchableOpacity
        style={[
            styles.timer,
            styles.upsideDown,
            activePlayer && activePlayer !== "p1" && styles.disabledTimer
        ]}
        onPress={() => setActivePlayer("p2")}
        disabled={activePlayer && activePlayer !== "p1" || player1Time === 0}
      >
        <Text style={styles.timerText}>{formatTime(player1Time)}</Text>
      </TouchableOpacity>

      {/* Player 2 Timer */}
      <TouchableOpacity
        style={[
            styles.timer,
            activePlayer && activePlayer !== "p2" && styles.disabledTimer
        ]}
        onPress={() => setActivePlayer("p1")}
        disabled={activePlayer &&activePlayer !== "p2" || player2Time === 0}
      >
        <Text style={styles.timerText}>{formatTime(player2Time)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 50,
  },
  timer: {
    width: 200,
    height: 200,
    backgroundColor: "deepskyblue",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledTimer: {
    backgroundColor: "lightgray",
  },
  timerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  upsideDown: {
    transform: [{ rotate: "180deg" }],
  },
});
