import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { style } from './styleHome';
import { Ionicons } from '@expo/vector-icons';

// Dados exemplo para "Entradas"
const dadosEntradas = [
  {
    nota: '41462412324325434563456',
    descricao: 'Venda de mercadoria adquirida ou recebida de terceiro lote, 25 caixas de mercadoria adquirida ou recebida',
    data: '14/08/2025 - 14:40:18',
  },
  {
    nota: '41462412324325434563457',
    descricao: 'Venda de mercadoria adquirida ou recebida de terceiro lote, 25 caixas de mercadoria adquirida ou recebida',
    data: '14/08/2025 - 14:40:18',
  },
  {
    nota: '41462412324325434563458',
    descricao: 'Venda de mercadoria adquirida ou recebida de terceiro lote, 25 caixas de mercadoria adquirida ou recebida',
    data: '14/08/2025 - 14:40:18',
  },
];

// Componente topo com logo, texto e ícone
function Topo() {
  return (
    <View style={style.topoContainer}>
      <Image
        source={require('../../assets/logoSp.png')}
        style={style.logo}
        resizeMode="contain"
      />
      <View style={style.textoContainer}>
        <Text style={style.bemVindoText}>Bem vindo</Text>
        <Text style={style.nomeUsuario}>Diogo Calderaro</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={55} color="#007bff" />
      </TouchableOpacity>
    </View>
  );
}

// Abas com cabeçalho azul e abas estilizadas
const Abas = ({ selecionada, setSelecionada }) => {
  return (
    <View style={style.abasWrapper}>
      <View style={style.abasHeader}>
        <Ionicons
          name="document-text-outline"
          size={20}
          color="#fff"
          style={{ marginRight: 6 }}
        />
        <Text style={style.abasHeaderText}>Entradas de notas</Text>
        <Text style={style.abasHeaderSubText}>Loja Cozinha (São Jorge)</Text>
      </View>

      <View style={style.abasContainer}>
        <TouchableOpacity
          style={[
            style.abaBotao,
            selecionada === 'Entradas' && style.abaBotaoSelecionado,
          ]}
          onPress={() => setSelecionada('Entradas')}
        >
          <Text
            style={[
              style.abaTexto,
              selecionada === 'Entradas' && style.abaTextoSelecionado,
            ]}
          >
            Entradas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            style.abaBotao,
            selecionada === 'Pendentes' && style.abaBotaoSelecionado,
          ]}
          onPress={() => setSelecionada('Pendentes')}
        >
          <Text
            style={[
              style.abaTexto,
              selecionada === 'Pendentes' && style.abaTextoSelecionado,
            ]}
          >
            Pendentes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
