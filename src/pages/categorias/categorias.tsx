import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const produtosCategoriaMock = [
  { id: '10', nome: '200 - Coca Cola 1LT' },
  { id: '20', nome: '300 - Fanta 2LT' },
  { id: '30', nome: '400 - Sprit 3LT' },
  // ... outros produtos para a categoria
];

// Define os campos de quantidade possíveis
interface QuantidadeCampos {
  contagem1?: string;
  contagem2?: string;
  sugestao?: string;
}

// Estado quantidades: chave é o id do produto, valor é QuantidadeCampos
type QuantidadesState = Record<string, QuantidadeCampos>;

interface CategoriasProps {
  searchText: string;
  quantidades: QuantidadesState;
  onQuantidadeChange: (produtoId: string, campo: keyof QuantidadeCampos, valor: string) => void;
}

export default function Categorias({ searchText, quantidades, onQuantidadeChange }: CategoriasProps) {

  // Filtra os produtos da categoria conforme searchText
  const produtosFiltrados = produtosCategoriaMock.filter((p) =>
    p.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ paddingHorizontal: 16 }}>
      {produtosFiltrados.map((item) => (
        <View key={item.id} style={styles.produtoCard}>
          <Text style={styles.produtoNome}>{item.nome}</Text>

          <View style={styles.quantidadeContainer}>
            {(['contagem1', 'contagem2', 'sugestao'] as (keyof QuantidadeCampos)[]).map((campo) => (
              <View style={styles.quantidadeInputContainer} key={campo}>
                <Text style={styles.quantidadeLabel}>
                  {campo === 'contagem1' && 'Contagem 1º'}
                  {campo === 'contagem2' && 'Contagem 2º'}
                  {campo === 'sugestao' && 'Sugestão'}
                </Text>
                <TextInput
                  style={styles.quantidadeInput}
                  keyboardType="numeric"
                  value={quantidades[item.id]?.[campo] || ''}
                  onChangeText={(text) => onQuantidadeChange(item.id, campo, text)}
                />
                <Text style={styles.unidadeText}>UND</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  produtoCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  produtoNome: {
    fontWeight: 'bold',
    marginBottom: 12,
    fontSize: 14,
    color: '#333',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantidadeInputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  quantidadeLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  quantidadeInput: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  unidadeText: {
    marginTop: 4,
    fontSize: 12,
    color: '#007bff',
    textAlign: 'center',
  },
});
