import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../routes/types';

type NotasDetalhesRouteProp = RouteProp<RootStackParamList, 'NotasDetalhes'>;
type NotasDetalhesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NotasDetalhes'>;

export default function NotasDetalhes() {
  const route = useRoute<NotasDetalhesRouteProp>();
  const navigation = useNavigation<NotasDetalhesNavigationProp>();
  const { nota } = route.params;

  const [openSections, setOpenSections] = useState({
    infoNota: true,
    dadosEmitente: true,
    dadosDestinatario: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Entradas</Text>
        </View>

        {/* Informação da Nota */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.sectionHeaderInsideCard}
            onPress={() => toggleSection('infoNota')}
          >
            <Text style={styles.sectionTitle}>Informação da nota</Text>
            <Ionicons
              name={openSections.infoNota ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {openSections.infoNota && (
            <View>
              <View style={styles.nfeContainer}>
                <View style={styles.nfeNumberContainer}>
                  <Text style={styles.nfeLabel}>NFe:</Text>
                  <Text style={styles.nfeNumber}>{nota.nfe}</Text>
                </View>
              </View>
              <Text style={styles.nfeDescription}>{nota.descricao}</Text>

              <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoBoxLabel}>Número</Text>
                  <TextInput
                    value={String(nota.numero)}
                    editable={false}
                    style={styles.input}
                  />
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoBoxLabel}>Série</Text>
                  <TextInput
                    value={String(nota.serie)}
                    editable={false}
                    style={styles.input}
                  />
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoBoxLabel}>Tipo de operação</Text>
                  <TextInput
                    value={nota.tipoOperacao}
                    editable={false}
                    style={styles.input}
                  />
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoBoxLabel}>Emissão</Text>
                  <TextInput
                    value={nota.emissao}
                    editable={false}
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Dados Emitente */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.sectionHeaderInsideCard}
            onPress={() => toggleSection('dadosEmitente')}
          >
            <Text style={styles.sectionTitle}>Dados Emitente</Text>
            <Ionicons
              name={openSections.dadosEmitente ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {openSections.dadosEmitente && (
            <View style={styles.sectionContent}>
              <Text style={styles.label}>CNPJ</Text>
              <TextInput
                value={nota.cnpjEmitente}
                editable={false}
                style={styles.input}
              />
              <Text style={[styles.label, { marginTop: 12 }]}>Nome/Razão Social</Text>
              <TextInput
                value={nota.razaoSocialEmitente}
                editable={false}
                style={styles.input}
              />
            </View>
          )}
        </View>

        {/* Dados Destinatário */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.sectionHeaderInsideCard}
            onPress={() => toggleSection('dadosDestinatario')}
          >
            <Text style={styles.sectionTitle}>Dados Destinatário</Text>
            <Ionicons
              name={openSections.dadosDestinatario ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {openSections.dadosDestinatario && (
            <View style={styles.sectionContent}>
              <Text style={styles.label}>CNPJ</Text>
              <TextInput
                value={nota.cnpjDestinatario}
                editable={false}
                style={styles.input}
              />
              <Text style={[styles.label, { marginTop: 12 }]}>Nome/Razão Social</Text>
              <TextInput
                value={nota.razaoSocialDestinatario}
                editable={false}
                style={styles.input}
              />
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 30, fontWeight: '700', marginLeft: 12, color: '#000' },
  button: {
    backgroundColor: '#02B3FF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  sectionTitle: { fontSize: 17, fontWeight: '600', color: '#333' },
  sectionHeaderInsideCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionContent: {
    marginTop: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  nfeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  nfeNumberContainer: {
    backgroundColor: '#02B3FF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nfeLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 4,
  },
  nfeNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nfeDescription: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  infoBox: {
    width: '48%',
    marginBottom: 12,
  },
  infoBoxLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  label: { fontSize: 12, color: '#666', marginBottom: 4 },
});
