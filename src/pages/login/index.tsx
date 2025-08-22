import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { style } from '../login/styles';

type Props = NativeStackScreenProps<any>;

export default function Login({ navigation }: Props) {
  return (
    <ImageBackground 
      source={require('../../assets/fundoSp.png')} 
      style={style.background} 
      resizeMode="cover"
    >
      <View style={style.container}>
        <Image source={require('../../assets/logoSp.png')} style={style.logo} resizeMode="contain" />
        
        <TouchableOpacity 
          style={style.button}
          onPress={() => navigation.navigate('LoginHome')}
        >
          <Ionicons name="cube" size={20} color="white" />
          <Text style={style.buttonText}>PRODUTOS</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
