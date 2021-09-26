import { View, SafeAreaView, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles'
import axios from 'axios'

function HomeScreen () {
  const [text, setText] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8080/hello').then((response) => {
      setText(response.data)
    })
  }, [text])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>HomeScreen</Text>
        <Button title='Test' onPress={() => setText('na')} />
        <Text>{text}</Text>
      </View>
    </SafeAreaView>
  )
};

export default HomeScreen
