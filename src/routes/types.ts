
export type RootStackParamList = {
  Login: undefined;
  LoginHome: undefined;
  LoginLojas: undefined;
  Home: undefined;
  NotasDetalhes: {
    nota: {
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
    };
  };
};
