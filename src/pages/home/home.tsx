import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { style } from './styleHome';
import { useAuth } from '../../pages/contexto/AuthContext';

// Componente Topo - mantém igual
function Topo() {
  const [showPerfilMenu, setShowPerfilMenu] = useState(false);
  const { logout, trocarLoja } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={style.topoContainer}>
      <Image
        source={require('../../assets/logoSp.png')}
        style={style.logo}
        resizeMode="contain"
      />
      <View style={style.textoContainer}>
        <Text style={style.bemVindoText}>Bem vindo</Text>
        <Text style={style.nomeUsuario}>Rafael Souza</Text>
      </View>

      <TouchableOpacity onPress={() => setShowPerfilMenu(true)}>
        <Ionicons name="person-circle-outline" size={55} color="#02B3FF" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={showPerfilMenu}
        animationType="fade"
        onRequestClose={() => setShowPerfilMenu(false)}
      >
        <Pressable style={style.modalOverlay} onPress={() => setShowPerfilMenu(false)}>
          <View style={style.modalContainer}>
            <TouchableOpacity
              style={style.modalOption}
              onPress={() => {
                setShowPerfilMenu(false);
                trocarLoja();
                navigation.navigate('LoginLojas' as never);
              }}
            >
              <Ionicons
                name="storefront-outline"
                size={20}
                color="#ffffffff"
                style={{ marginRight: 8 }}
              />
              <Text style={style.modalOptionText}>Trocar de Loja</Text>
            </TouchableOpacity>
            <View style={style.separatorLine} />
            <TouchableOpacity
              style={style.modalOption}
              onPress={() => {
                setShowPerfilMenu(false);
                logout();
                navigation.navigate('Login' as never);
              }}
            >
              <Ionicons
                name="exit-outline"
                size={20}
                color="#ffffffff"
                style={{ marginRight: 8 }}
              />
              <Text style={style.modalOptionText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

function InfoLoja({ loja }: { loja: string }) {
  return (
    <View style={style.infoLojaContainer}>
      <View style={style.infoLojaInner}>
        <Ionicons name="cube-outline" size={20} color="white" />
        <Text style={style.infoLojaText}>Pedidos de Compras</Text>
      </View>
      <Text style={style.lojaNome}>{loja}</Text>
    </View>
  );
}

// Componente EntradaItem ajustado conforme imagem
function EntradaItem({
  item,
}: {
  item: { id: string; data: string; titulo: string; nota: string };
}) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{ flex: 1 }}>
        {item.nota ? (
          <Text
            style={{
              fontSize: 12,
              color: '#444',
              marginBottom: 4,
              fontWeight: '600',
            }}
            numberOfLines={1}
          >
            {item.nota}
          </Text>
        ) : null}

        <Text
          style={{
            fontWeight: '700',
            fontSize: 14,
            color: '#222',
            marginBottom: 8,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.titulo}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="calendar-outline" size={14} color="#02B3FF" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 12, color: '#666' }}>{item.data}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward-outline" size={24} color="#02B3FF" />
    </View>
  );
}

// Componente Abas
function Abas({ abaAtiva, setAbaAtiva }: { abaAtiva: string; setAbaAtiva: (aba: 'Entradas' | 'Pendentes') => void }) {
  return (
    <View style={{
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginHorizontal: 10,
      marginTop: 10,
    }}>
      {['Entradas', 'Pendentes'].map((aba) => (
        <TouchableOpacity
          key={aba}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderBottomWidth: 3,
            borderBottomColor: abaAtiva === aba ? '#02B3FF' : 'transparent',
            alignItems: 'center',
          }}
          onPress={() => setAbaAtiva(aba as 'Entradas' | 'Pendentes')}
        >
          <Text style={{ 
            color: abaAtiva === aba ? '#02B3FF' : '#666',
            fontWeight: abaAtiva === aba ? '700' : '400',
            fontSize: 16,
          }}>
            {aba}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function Home() {
  const route = useRoute() as any;
  const { loja } = route.params || { loja: 'Loja não definida' };

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'Entradas' | 'Pendentes'>('Entradas');

  const entradas = [
    {
      id: '1',
      data: '14/08/2025 - 14:40:18',
      titulo: 'Venda de mercadoria adquirida ou recebida de terceiro lote, 25 caixas de mercadoria adquirida ou recebida de terceiro lote',
      nota: 'Nota: 41462412334523454536456546',
    },
    {
      id: '2',
      data: '14/08/2025 - 14:40:18',
      titulo: 'Venda de mercadoria adquirida ou recebida de terceiro lote, 25 caixas de mercadoria adquirida ou recebida de terceiro lote',
      nota: '',
    },
    {
      id: '3',
      data: '14/08/2025 - 14:40:18',
      titulo: 'Venda de mercadoria adquirida ou recebida de terceiro lote, 25 caixas de mercadoria adquirida ou recebida de terceiro lote',
      nota: '',
    },
    {
      id: '4',
      data: '14/08/2025 - 14:40:18',
      titulo: 'Venda de mercadoria adquirida ou recebida de terceiro lote, 25 caixas de mercadoria adquirida ou recebida de terceiro lote',
      nota: '',
    },
    {
      id: '5',
      data: '14/08/2025 - 14:40:18',
      titulo: 'Venda de mercadoria adquirida ou recebida de terceiro lote, 25 caixas de mercadoria adquirida ou recebida de terceiro lote',
      nota: '',
    },
  ];

  const pendentes = [
    {
      id: '10',
      data: '15/08/2025 - 10:00:00',
      titulo: 'Pedido pendente: mercadoria aguardando confirmação',
      nota: 'Nota: 1234567890',
    },
    {
      id: '11',
      data: '15/08/2025 - 11:30:00',
      titulo: 'Pedido pendente: aguardando aprovação financeira',
      nota: '',
    },
  ];

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <SafeAreaView style={style.container}>
      <Topo />
      <InfoLoja loja={loja} />

      {/* Abas */}
      <Abas abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

      {/* Date Picker */}
      {showDatePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {showDatePicker && Platform.OS === 'ios' && (
        <View style={{ backgroundColor: '#fff', padding: 10 }}>
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChangeDate}
            style={{ backgroundColor: 'white' }}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(false)}
            style={{ alignItems: 'center', marginTop: 10 }}
          >
            <Text style={{ color: '#02B3FF', fontWeight: 'bold' }}>OK</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Lista de entradas ou pendentes */}
      <FlatList
        data={abaAtiva === 'Entradas' ? entradas : pendentes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EntradaItem item={item} />}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* Rodapé */}
      <View style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 10,
  backgroundColor: '#fff',
}}>

  {/* Espaço vazio à esquerda para balancear */}
  <View style={{ width: 50 }} />

  {/* Botão central azul redondo */}
  <TouchableOpacity
    style={{
      backgroundColor: '#02B3FF',
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#02B3FF',
      shadowOpacity: 0.6,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 5,
    }}
    onPress={() => {
      alert('Registrar clicado');
    }}
  >
    <Ionicons name="qr-code-outline" size={35} color="white" />
    <Text style={{ color: 'white', fontSize: 12, marginTop: 4, fontWeight: '600' }}>
      Registrar
    </Text>
  </TouchableOpacity>

  {/* Botão laranja arredondado à direita */}
  <TouchableOpacity
    style={{
      backgroundColor: '#F26522',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#fff',
      shadowOpacity: 0.6,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 5,
    }}
    onPress={() => {
      alert('Ajuda clicada');
    }}
  >
    <Ionicons name="help-outline" size={28} color="white" />
  </TouchableOpacity>

</View>
    </SafeAreaView>
  );
}
