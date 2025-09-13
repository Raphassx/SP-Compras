import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styleNotas';

// Tipo Produto ajustado para aceitar imagem local via require()
type Produto = {
  codigo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  unidade?: string;
  imagem?: ImageSourcePropType;
};

type Nota = {
  nfe: string;
  descricao?: string;
  numero: number;
  serie: number;
  tipoOperacao: string;
  emissao: string;
  cnpjEmitente: string;
  razaoSocialEmitente: string;
  cnpjDestinatario: string;
  razaoSocialDestinatario: string;
  produtos?: Produto[];
  valorNota?: number;
  valorProdutos?: number;
};

type RootStackParamList = {
  NotasDetalhes: { nota: Nota };
};

type NotasDetalhesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NotasDetalhes'
>;

export default function NotasDetalhes() {
  // Dados fixos locais
  const nota: Nota = {
    nfe: '123456789',
    numero: 123,
    serie: 1,
    tipoOperacao: 'Venda',
    emissao: '2025-09-03',
    cnpjEmitente: '12.345.678/0001-99',
    razaoSocialEmitente: 'Empresa Exemplo Ltda',
    cnpjDestinatario: '98.765.432/0001-11',
    razaoSocialDestinatario: 'Cliente Exemplo SA',
    produtos: [
      {
        codigo: '8458',
        descricao:
          'Refrigerante Coca-Cola Original, 350ml, Pack com 12 unidades, Coca-Cola - PT 12 UN',
        quantidade: 72000,
        unidade: 'L',
        valorUnitario: 12.7928,
        valorTotal: 921.08,
        imagem: require('../../assets/produto.png'), // Ajuste para o caminho da imagem no seu projeto
      },
      {
        codigo: '8458',
        descricao:
          'Refrigerante Coca-Cola Original, 350ml, Pack com 12 unidades, Coca-Cola - PT 12 UN',
        quantidade: 72000,
        unidade: 'CX',
        valorUnitario: 12.7928,
        valorTotal: 921.08,
        imagem: require('../../assets/produto.png'),
      },
    ],
    valorNota: 921.08,
    valorProdutos: 921.08,
  };

  const navigation = useNavigation<NotasDetalhesNavigationProp>();

  const [openSections, setOpenSections] = useState({
    infoNota: true,
    dadosEmitente: true,
    dadosDestinatario: true,
    eventosServicos: true, // nova seção adicionada
  });
  const [openProdutos, setOpenProdutos] = useState(true);

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
          <Text style={styles.headerTitle}>Detalhes da Nota</Text>
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
                  <Text style={styles.nfeNumber}>{nota.nfe || '---'}</Text>
                </View>
              </View>
              <Text style={styles.nfeDescription}>
                {nota.descricao || 'Sem descrição'}
              </Text>

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
              <Text style={[styles.label, { marginTop: 12 }]}>
                Nome/Razão Social
              </Text>
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
              <Text style={[styles.label, { marginTop: 12 }]}>
                Nome/Razão Social
              </Text>
              <TextInput
                value={nota.razaoSocialDestinatario}
                editable={false}
                style={styles.input}
              />
            </View>
          )}
        </View>

       
        {/* Produtos */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.sectionHeaderInsideCard}
            onPress={() => setOpenProdutos(!openProdutos)}
          >
            <Text style={styles.sectionTitle}>Produtos</Text>
            <Ionicons
              name={openProdutos ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {openProdutos && (
            <View style={{ marginTop: 12 }}>
              {(nota.produtos || []).map((produto, index) => (
                <View key={index} style={styles.produtoContainer}>
                  <Text style={styles.produtoCodigo}>CÓDIGO: {produto.codigo}</Text>
                  <View style={styles.produtoRow}>
                    <Image
                      source={produto.imagem || require('../../assets/produto.png')}
                      style={styles.produtoImagem}
                    />
                    <View style={styles.produtoInfo}>
                      <Text
                        style={styles.produtoDescricao}
                        numberOfLines={3}
                      >
                        <Text style={{ fontWeight: '700' }}>
                          {produto.descricao}
                        </Text>
                      </Text>
                      <Text style={styles.produtoQuantidade}>
                        {produto.quantidade.toLocaleString('pt-BR', {
                          minimumFractionDigits: 3,
                        })}{' '}
                        {produto.unidade || 'UN'} x R${' '}
                        {produto.valorUnitario.toLocaleString('pt-BR', {
                          minimumFractionDigits: 4,
                        })}
                      </Text>
                    </View>
                    <Text style={styles.produtoValorTotal}>
                      R${' '}
                      {produto.valorTotal.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  {index < (nota.produtos?.length || 0) - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}

              <View style={styles.resumoContainer}>
                <Text style={styles.resumoText}>
                  Valor da nota:{' '}
                  <Text style={{ fontWeight: '700' }}>
                    R${' '}
                    {nota.valorNota?.toLocaleString('pt-BR', {
                      minimumFractionDigits: 10,
                    })}
                  </Text>
                </Text>
                <Text style={styles.resumoText}>
                  Valor dos Produtos:{' '}
                  <Text style={{ fontWeight: '700' }}>
                    R${' '}
                    {nota.valorProdutos?.toLocaleString('pt-BR', {
                      minimumFractionDigits: 10,
                    })}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </View>

 {/* Eventos e Serviços */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.sectionHeaderInsideCard}
            onPress={() => toggleSection('eventosServicos')}
          >
            <Text style={styles.sectionTitle}>Eventos e Serviços</Text>
            <Ionicons
              name={openSections.eventosServicos ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {openSections.eventosServicos && (
            <View style={styles.sectionContent}>
              <Text style={styles.label}>Evento</Text>
              <TextInput
                value="26288710000397"
                editable={false}
                style={styles.input}
              />
              <Text style={[styles.label, { marginTop: 12 }]}>Protocolo</Text>
              <TextInput
                value="113242996353152"
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

