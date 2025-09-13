export type Produto = {
  codigo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
};

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

    produtos?: Produto[];          // opcional
    valorNota?: number;            // opcional
    valorProdutos?: number;        // opcional
  };
};


  NotasPendentes: {
    nota: {
      numero: number;
      serie: number;
      tipoOperacao: string;
      emissao: string;
      cnpjEmitente: string;
      razaoSocialEmitente: string;
      cnpjDestinatario: string;
      razaoSocialDestinatario: string;
      nfe: string;
    };
  };
};
