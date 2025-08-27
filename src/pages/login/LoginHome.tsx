import React, { useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, Image, 
  KeyboardAvoidingView, Platform, ImageBackground, Alert, Modal 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<any>;

export default function LoginHome({ navigation }: Props) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tentativas, setTentativas] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState('');

  const handleLogin = () => {
    const usuarioCorreto = 'admin';
    const senhaCorreta = '123456';

    if (usuario === usuarioCorreto && senha === senhaCorreta) {
  setTentativas(0);
  navigation.replace('LoginLojas'); // ⬅️ aqui vai para LoginLojas.tsx
} else {
      const novasTentativas = tentativas + 1;
      setTentativas(novasTentativas);

      if (novasTentativas >= 5) {
        Alert.alert('Erro', 'Você atingiu o limite de tentativas. Por favor, recupere sua senha.');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
      }
    }
  };

  const handleRecuperarSenha = () => {
    if (emailRecuperacao.trim().length === 0) {
      Alert.alert('Erro', 'Por favor, digite uma parte do seu e-mail cadastrado.');
      return;
    }

    setModalVisible(false);
    Alert.alert(
      'Recuperação de senha',
      `Um link de recuperação foi enviado para o e-mail que contém: ${emailRecuperacao}`
    );
    setEmailRecuperacao('');
  };

  return (
    <ImageBackground
      source={require('../../assets/fundoLogin.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.topContainer}>
          <Image source={require('../../assets/logoSp.png')} style={styles.logo} resizeMode="contain" />

          <TouchableOpacity 
            style={styles.produtosButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="cube" size={14} color="white" />
            <Text style={styles.produtosButtonText}>NOTAS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              returnKeyType="done"
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.eyeIcon}>
              <Ionicons name={mostrarSenha ? "eye" : "eye-off"} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Acessar</Text>
          </TouchableOpacity>

          {tentativas >= 5 && (
            <TouchableOpacity 
              style={styles.esqueceuButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.esqueceuText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Modal para digitar email */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Recuperar senha</Text>
              <Text style={{ marginBottom: 10 }}>
                Digite parte do seu e-mail cadastrado:
              </Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Ex: seuemail@example.com"
                value={emailRecuperacao}
                onChangeText={setEmailRecuperacao}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, { backgroundColor: '#007bff' }]} 
                  onPress={handleRecuperarSenha}
                >
                  <Text style={styles.modalButtonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, { backgroundColor: '#aaa' }]} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    marginBottom: 40,
  },
  logo: {
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
  },
  produtosButtonText: {
    color: 'white',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 15,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#02B3FF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  esqueceuButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  esqueceuText: {
    color: '#007bff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
