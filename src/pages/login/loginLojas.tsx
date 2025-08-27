import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const lojas = [
  'Loja Cozinha (São Jorge)',
  'Loja Cozinha (Cidade Nova)',
  'Loja Cozinha (Centro)',
  'Loja Cozinha (Lirio do vale 2)',
  'Loja Cozinha (Nova Esperança)',
  'Loja Cozinha (Alvorada)',
];

export default function LoginLojas({ navigation }: any) {
  const [lojaSelecionada, setLojaSelecionada] = useState<string | null>(null);

  const handleAcessar = () => {
    if (lojaSelecionada) {
      navigation.navigate('Home', { loja: lojaSelecionada });
    } else {
      alert('Por favor, selecione uma loja.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/fundoLogin.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Topo com logo e botão */}
        <View style={styles.topContainer}>
          <Image
            source={require('../../assets/logoSp.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.produtosButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="cube" size={14} color="white" />
            <Text style={styles.produtosButtonText}>NOTAS</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Loja</Text>
        <Text style={styles.subtitle}>
          Selecione uma das lojas para acessar os formulários
        </Text>

        <FlatList
          data={lojas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.lojaItem,
                lojaSelecionada === item && styles.lojaItemSelecionada,
              ]}
              onPress={() => setLojaSelecionada(item)}
            >
              <Ionicons
                name={
                  lojaSelecionada === item
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={20}
                color={lojaSelecionada === item ? '#02B3FF' : '#aaa'}
              />
              <Text style={styles.lojaText}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 100 }} // espaço para o botão fixo
        />

        <TouchableOpacity style={styles.acessarButton} onPress={handleAcessar}>
          <Text style={styles.acessarButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 15,
  },
  topContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 10,
  },
  produtosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#02B3FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  produtosButtonText: {
    color: 'white',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  lojaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  lojaItemSelecionada: {
    backgroundColor: '#e0eaff',
  },
  lojaText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  acessarButton: {
    backgroundColor: '#02B3FF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  acessarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
