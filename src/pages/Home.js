import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

export function Home() {
  const [ newSkill, setNewSkill ] = useState('')
  const [ mySkills, setMySkills ] = useState([])
  const [ gretting, setGretting ]  = useState('')

  function handleAddNewSkill() {
    setMySkills(oldState => [...oldState, newSkill])
  }


  useEffect(() => {
    const currentHour = new Date().getHours()
    
    if(currentHour < 12) {
      setGretting('Bom dia')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting('Boa tarde')
    } else {
      setGretting('Boa noite')
    }
  },[])

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>{gretting}, Vitor</Text>

      <TextInput
        style={styles.input}
        placeholder="Nova habilidade"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>Suas Habilidades:</Text>

      <FlatList 
        data={mySkills}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <SkillCard key={item} skill={item} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 5,
  }
})
