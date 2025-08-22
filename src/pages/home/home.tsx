import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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

import Categorias from '../categorias/categorias';

// Componente Topo atualizado com modal perfil
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
        <Ionicons name="person-circle-outline" size={55} color="#007bff" />
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
        <Ionicons name="storefront-outline" size={20} color="#ffffffff" style={{ marginRight: 8 }} />
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
        <Ionicons name="exit-outline" size={20} color="#ffffffff" style={{ marginRight: 8 }} />
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

const categorias = ['Todos', 'Bebidas', 'Descartáveis', 'Proteínas', 'Limpeza'];

const produtosMock = [
  { id: '1', nome: '315 - ÁGUA SANITÁRIA 1LT' },
  { id: '2', nome: '316 - ÁGUA SANITÁRIA 2LT' },
  { id: '3', nome: '317 - ÁGUA SANITÁRIA 3LT' },
  { id: '4', nome: '318 - ÁGUA SANITÁRIA 4LT' },
  { id: '5', nome: '319 - ÁGUA SANITÁRIA 5LT' },
];

// Interface dos campos de quantidade
interface QuantidadeCampos {
  contagem1?: string;
  contagem2?: string;
  sugestao?: string;
}

type QuantidadesState = Record<string, QuantidadeCampos>;

export default function Home() {
  const route = useRoute() as any;
  const { loja } = route.params || { loja: 'Loja não definida' };

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [quantidades, setQuantidades] = useState<QuantidadesState>({});

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleQuantidadeChange = (
    produtoId: string,
    campo: keyof QuantidadeCampos,
    valor: string
  ) => {
    setQuantidades((prev) => {
      const produtoAtual = prev?.[produtoId] ?? {};

      return {
        ...prev,
        [produtoId]: {
          ...produtoAtual,
          [campo]: valor,
        },
      };
    });
  };

  const produtosFiltrados = produtosMock.filter((p) =>
    p.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={style.container}>
      <Topo />
      <InfoLoja loja={loja} />

      {/* Busca e data */}
      <View style={style.searchDateContainer}>
        <TextInput
          style={style.searchInput}
          placeholder="Buscar por nome"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={style.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#007bff" />
          <Text style={style.dateText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

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
            <Text style={{ color: '#007bff', fontWeight: 'bold' }}>OK</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Categorias */}
      <View style={style.categoriaContainer}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              style.categoriaButton,
              categoriaSelecionada === cat && style.categoriaButtonSelected,
            ]}
            onPress={() => setCategoriaSelecionada(cat)}
          >
            <Text
              style={[
                style.categoriaButtonText,
                categoriaSelecionada === cat && style.categoriaButtonTextSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conteúdo dinâmico */}
      <View style={{ flex: 1 }}>
        {categoriaSelecionada === 'Todos' ? (
          <FlatList
            data={produtosFiltrados}
            keyExtractor={(item) => item.id}
            style={style.produtosList}
            renderItem={({ item }) => (
              <View style={style.produtoCard}>
                <Text style={style.produtoNome}>{item.nome}</Text>

                <View style={style.quantidadeContainer}>
                  {(['contagem1', 'contagem2', 'sugestao'] as (keyof QuantidadeCampos)[]).map(
                    (campo) => (
                      <View style={style.quantidadeInputContainer} key={campo}>
                        <Text style={style.quantidadeLabel}>
                          {campo === 'contagem1' && 'Contagem 1º'}
                          {campo === 'contagem2' && 'Contagem 2º'}
                          {campo === 'sugestao' && 'Sugestão'}
                        </Text>
                        <TextInput
                          style={style.quantidadeInput}
                          keyboardType="numeric"
                          value={quantidades[item.id]?.[campo] || ''}
                          onChangeText={(text) =>
                            handleQuantidadeChange(item.id, campo, text)
                          }
                        />
                        <Text style={style.unidadeText}>UND</Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            )}
          />
        ) : (
          <Categorias
            searchText={searchText}
            quantidades={quantidades}
            onQuantidadeChange={handleQuantidadeChange}
          />
        )}
      </View>

      {/* Rodapé */}
      <View style={style.footerWrapper}>
        <View style={style.footerCard}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="limegreen"
            style={style.footerIcon}
          />
          <View>
            <Text style={style.footerTextBold}>
              Última atualização - {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({date.toLocaleDateString()})
            </Text>
            <Text style={style.footerText}>Dados sincronizados</Text>
          </View>
        </View>
        <TouchableOpacity style={style.footerHelpButton}>
          <Ionicons name="help" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
