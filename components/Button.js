import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Button({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}>
        <Pressable style={[styles.button, { backgroundColor: '#fff' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  else if (theme == 'big') {
    return (
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }else if(theme=='reset'){
    return (
      <View  >
      <Pressable  onPress={onPress}  style={{display:'flex',flexDirection:'row'}} >
      <FontAwesome name="refresh" size={18} color="#fff" style={styles.buttonIcon} />
      <Text style={[styles.buttonLabel, { color: '#fff' }]}>{label}</Text>
    </Pressable>
      </View>
    );
  }else if(theme=='toggle'){
    return (
      <View  >
      <Pressable  onPress={onPress}  style={{display:'flex',flexDirection:'row'}} >
      <FontAwesome name="camera" size={18} color="#fff" style={styles.buttonIcon} />
      <Text style={[styles.buttonLabel, { color: '#fff' }]}>{label}</Text>
    </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer2}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>

  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  buttonContainer2: {
    width: 120,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },

});
