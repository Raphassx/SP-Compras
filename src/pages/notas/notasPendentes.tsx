import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';  // Import do useNavigation

export default function NotasPendentes() {
  const navigation = useNavigation();  // Hook para navegação

  const [produtos, setProdutos] = useState([
    {
      id: '1',
      codigo: '8458',
      descricao:
        'Refrigerante Coca-Cola Original, 350ml, Pack com 12 unidades, Coca-Cola - PT 12 UN',
      quantidade: '240',
      tipo: 'CX',
      status: 'erro',
      validade: '16/10/2024',
      imagem: require('../../assets/produto.png'),
    },
    {
      id: '2',
      codigo: '8458',
      descricao:
        'Refrigerante Coca-Cola Original, 350ml, Pack com 12 unidades, Coca-Cola - PT 12 UN',
      quantidade: '240',
      tipo: 'CX',
      status: 'erro',
      validade: '16/10/2024',
      imagem: require('../../assets/produto.png'),
    },
    {
      id: '3',
      codigo: '8458',
      descricao:
        'Refrigerante Coca-Cola Original, 350ml, Pack com 12 unidades, Coca-Cola - PT 12 UN',
      quantidade: '240',
      tipo: 'CX',
      status: 'aprovado',
      validade: '16/10/2024',
      imagem: require('../../assets/produto.png'),
    },
    {
      id: '4',
      codigo: '8458',
      descricao:
        'Refrigerante Coca-Cola Original, 350ml, Pack com 12 unidades, Coca-Cola - PT 12 UN',
      quantidade: '240',
      tipo: 'CX',
      status: 'aprovado',
      validade: '16/10/2024',
      imagem: require('../../assets/produto.png'),
    },
  ]);

  const todosAprovados = produtos.every((item) => item.status === 'aprovado');

  const handleQuantidadeChange = (text: string, id: string) => {
    setProdutos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const novoStatus = text === '250' ? 'aprovado' : 'erro';
          return { ...item, quantidade: text, status: novoStatus };
        }
        return item;
      })
    );
  };

  const renderItem = ({ item }: { item: typeof produtos[0] }) => {
    const isErro = item.status === 'erro';
    const borderColor = isErro ? '#FF0000' : '#228B22';
    const badgeColor = isErro ? '#FF0000' : '#228B22';

    return (
      <View
        style={{
          borderWidth: 1,
          borderColor,
          borderRadius: 8,
          marginHorizontal: 10,
          marginVertical: 8,
          padding: 12,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        {/* Imagem */}
        <Image
          source={item.imagem}
          style={{
            width: 60,
            height: 60,
            resizeMode: 'contain',
            marginRight: 12,
            marginTop: 8,
          }}
        />

        {/* Informações */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#444', fontSize: 12, marginBottom: 2 }}>
            CÓDIGO: {item.codigo}
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 8 }}>
            {item.descricao}
          </Text>

          {/* Linha de quantidade, tipo e validade */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Quantidade */}
            <View
              style={{
                marginRight: 6,
                width: 90,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  marginBottom: 4,
                  color: '#444',
                }}
              >
                Quantidade
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor,
                  borderRadius: 8,
                  paddingHorizontal: 5,
                  paddingVertical: 6,
                  backgroundColor: '#fff',
                }}
              >
                <TextInput
                  value={item.quantidade}
                  keyboardType="numeric"
                  onChangeText={(text) => handleQuantidadeChange(text, item.id)}
                  style={{
                    fontSize: 14,
                    padding: 0,
                    margin: 0,
                    height: 17,
                    color: '#000',
                  }}
                />
              </View>
            </View>

            {/* Tipo */}
            <View
              style={{
                backgroundColor: badgeColor,
                borderRadius: 8,
                paddingVertical: 7,
                paddingHorizontal: 22,
                marginRight: 6,
                flexDirection: 'row',
                alignItems: 'center',
                top:8,
              }}
            >
              <Text
                style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}
              >
                {item.tipo}
              </Text>
              <Ionicons
                name="ellipse"
                size={10}
                color="#fff"
                style={{ marginLeft: 6 }}
              />
            </View>

            {/* Validade */}
            <View
              style={{
                marginRight: 6,
                width: 110,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: '#333',
                  marginBottom: 4,
                }}
              >
                Validade
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor,
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: borderColor,
                  }}
                >
                  {item.validade}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FC' }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#E1F3FF',
            borderRadius: 16,
            padding: 6,
          }}
          onPress={() => navigation.goBack()} // Vai para tela anterior
        >
          <Ionicons name="arrow-back" size={18} color="#007AFF" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#222',
              paddingRight: 60,
          }}
        >
          Pendentes
        </Text>
       <TouchableOpacity
  style={{
    backgroundColor: '#FF7900',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  }}
>
  <Ionicons name="cloud-download-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Baixar Nota</Text>
</TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <ScrollView style={{ flex: 1 }}>
        {/* Informação da nota */}
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginTop: 16,
            borderRadius: 8,
            padding: 12,
          }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
            Informação da nota
          </Text>
          <View
            style={{
              backgroundColor: '#02B3FF',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 30,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Nfc 414824</Text>
          </View>
        </View>

        {/* Lista produtos */}
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
          scrollEnabled={false} // Para evitar rolagem dupla com ScrollView
        />
      </ScrollView>

      {/* Botão confirmar nota */}
      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderColor: '#eee',
          backgroundColor: '#fff',
        }}
      >
        <TouchableOpacity
          disabled={!todosAprovados}
          style={{
            backgroundColor: todosAprovados ? '#02B3FF' : '#ccc',
            paddingVertical: 14,
            borderRadius: 30,
            alignItems: 'center',
          }}
          onPress={() => alert('Nota confirmada!')}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            Confirmar nota
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
