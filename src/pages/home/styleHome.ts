import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 80,
    height: 60,
    marginRight: 12,
  },
  textoContainer: {
  flex: 1,
  justifyContent: 'center', // Adiciona esse
  alignItems: 'center', 
  right: 30,    // E esse
},
  bemVindoText: {
    fontSize: 15,
    color: '#555',
  },
  nomeUsuario: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  infoLojaContainer: {
    backgroundColor: '#02B3FF',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  infoLojaInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLojaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
  },
  lojaNome: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  searchDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 10,
    fontSize: 14,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  dateText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#02B3FF',
  },
  categoriaContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoriaButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginRight: 8,
  },
  categoriaButtonSelected: {
    backgroundColor: '#02B3FF',
  },
  categoriaButtonText: {
    fontSize: 14,
    color: '#777',
  },
  categoriaButtonTextSelected: {
    color: 'white',
  },
  produtosList: {
    flex: 1,
    paddingHorizontal: 16,
  },
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
    borderColor: '#02B3FF',
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
  footer: {
    backgroundColor: '#02B3FF',
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 8,
  },
 
  footerWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  marginTop: 8,
},

footerCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#02B3FF',
  borderRadius: 30,
  paddingHorizontal: 16,
  paddingVertical: 8,
  flex: 1,
  marginRight: 12,
},

footerIcon: {
  marginRight: 10,
},

footerTextBold: {
  color: 'white',
  fontSize: 12,
  fontWeight: 'bold',
},

footerText: {
  color: 'white',
  fontSize: 12,
},

footerHelpButton: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#f26522',
  alignItems: 'center',
  justifyContent: 'center',
},

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(21, 108, 148, 0.3)', // sombra preta translúcida
    justifyContent: 'flex-start', // menu fica no topo
    alignItems: 'flex-end', // menu alinhado à direita
    paddingTop: 50, // distância do topo (ajuste conforme header)
    paddingRight: 10,
  },
  modalContainer: {
    backgroundColor: '#2b2f35ee',
    borderRadius: 8,
    width: 180,
    elevation: 5, // sombra android
    shadowColor: '#000', // sombra ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingVertical: 10,
  },
  
  modalOptionText: {
    fontSize: 16,
    color: '#ffffffff',
  },
  modalOption: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 16,
},
separatorLine: {
  height: 1,
  backgroundColor: '#ccc', // cor cinza clara
  marginVertical: 2,
},
entradaItemContainer: {
  flexDirection: 'row',
  paddingVertical: 12,
  paddingHorizontal: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  backgroundColor: 'white',
  alignItems: 'flex-start',
},

entradaIconContainer: {
  marginRight: 12,
  justifyContent: 'center',
  alignItems: 'center',
  width: 50,
},

entradaTextContainer: {
  flex: 1,
},

entradaData: {
  color: '#02B3FF',
  fontSize: 12,
  marginBottom: 4,
  fontWeight: '600',
},

entradaTitulo: {
  color: '#007bff',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 4,
},

entradaDescricao: {
  fontSize: 14,
  color: '#333',
  lineHeight: 20,
},
entradaNota: {
  fontSize: 12,
  color: '#999',
},

tabsContainer: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  backgroundColor: 'white',
},
tabButton: {
  flex: 1,
  alignItems: 'center',
  paddingVertical: 12,
  position: 'relative',
},
tabButtonActive: {},
tabText: {
  fontSize: 16,
  color: '#666',
},
tabTextActive: {
  color: '#02B3FF',
  fontWeight: 'bold',
},
tabUnderline: {
  position: 'absolute',
  bottom: 0,
  height: 3,
  width: '100%',
  backgroundColor: '#02B3FF',
},
});
