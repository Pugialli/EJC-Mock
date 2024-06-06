import { HeaderInstitucional } from '../HeaderInstitucional'
import { Dom } from './Dom'

export default function Espiritualidade() {
  return (
    <HeaderInstitucional title="Espiritualidade">
      <p>
        A espiritualidade do EJC foi definida pelo seu fundador, quando ele
        afirmou:
      </p>
      <p>
        &quot;Doação, Pobreza, Simplicidade, Alegria e Oração são a tônica do
        Encontrão&quot;
      </p>
      <p>
        Dessa forma, nossas ações e atividades buscam ser pautadas nesses
        pilares para que a essência do Encontro continue se perpetuando.
      </p>
      <p>
        Assim também é a nossa organização. Todo ano, cinco jovens recebem a
        missão de estar à frente do movimento. Cada um deles carrega a
        responsabilidade de ser reflexo de um dos dons do EJC.
      </p>
      <div className="flex flex-col gap-8 pt-8 lg:pt-16">
        <h3 className="text-2xl font-bold lg:text-4xl">
          Quer entender mais sobre os dons?
        </h3>
        <Dom
          title="Doação"
          content="Se trata daquilo que é necessário e essencial na vida cristã. O ensinamento e o exemplo de Cristo nos ensinam a vida de doação humilde e generosa a serviço dos outros. O importante é dar-se totalmente naquilo que se dá."
        />
        <Dom
          title="Pobreza"
          content="É aquele que tudo espera de Deus, não querendo isso dizer que a Providência Divina dispensa a providência e o trabalho dos homens. Estes devem ser realizados sem inquietação exagerada, sem preocupações perturbadoras. É aquele que confia mais na ação de Deus do que no perfeccionismo dos seus planos e de suas técnicas humanas."
        />
        <Dom
          title="Simplicidade"
          content="Atitude semelhante a da criança: confiante, espontânea, verdadeira. É o reconhecimento, portanto, de nossa própria verdade, é a consequência de nosso valor e, também, de nossas limitações. Sem impostura, sem duplicidade."
        />
        <Dom
          title="Alegria"
          content="A qual não é festividade inconsequente nem extravasamento de um vazio interior. A alegria provém de outra fonte, é espiritual. É a comunicação da paz interior, nascida da certeza da vitória do bem sobre o mal."
        />
        <Dom
          title="Oração"
          content="É comunicar-se com Deus, é identificar-se com a sua vontade, mantendo uma disponibilidade renovada a seus desígnios. A oração, feita com fé, poderá, remover montanhas e dispor para acolhimento generoso do dom e do apelo de Deus."
        />
      </div>
    </HeaderInstitucional>
  )
}
