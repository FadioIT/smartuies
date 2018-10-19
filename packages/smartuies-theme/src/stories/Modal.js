import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Modal from '../components/Modal';

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add('basic example', () => (
    <div>
      <p>
        Nec piget dicere avide magis hanc insulam populum Romanum invasisse quam
        iuste. Ptolomaeo enim rege foederato nobis et socio ob aerarii nostri
        angustias iusso sine ulla culpa proscribi ideoque hausto veneno
        voluntaria morte deleto et tributaria facta est et velut hostiles eius
        exuviae classi inpositae in urbem advectae sunt per Catonem, nunc
        repetetur ordo gestorum.
      </p>

      <p>
        Siquis enim militarium vel honoratorum aut nobilis inter suos rumore
        tenus esset insimulatus fovisse partes hostiles, iniecto onere catenarum
        in modum beluae trahebatur et inimico urgente vel nullo, quasi
        sufficiente hoc solo, quod nominatus esset aut delatus aut postulatus,
        capite vel multatione bonorum aut insulari solitudine damnabatur.
      </p>

      <p>
        Alios autem dicere aiunt multo etiam inhumanius (quem locum breviter
        paulo ante perstrinxi) praesidii adiumentique causa, non benevolentiae
        neque caritatis, amicitias esse expetendas; itaque, ut quisque minimum
        firmitatis haberet minimumque virium, ita amicitias appetere maxime; ex
        eo fieri ut mulierculae magis amicitiarum praesidia quaerant quam viri
        et inopes quam opulenti et calamitosi quam ii qui putentur beati.
      </p>

      <p>
        Ideo urbs venerabilis post superbas efferatarum gentium cervices
        oppressas latasque leges fundamenta libertatis et retinacula sempiterna
        velut frugi parens et prudens et dives Caesaribus tamquam liberis suis
        regenda patrimonii iura permisit.
      </p>

      <p>
        Eius populus ab incunabulis primis ad usque pueritiae tempus extremum,
        quod annis circumcluditur fere trecentis, circummurana pertulit bella,
        deinde aetatem ingressus adultam post multiplices bellorum aerumnas
        Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga
        quam orbis ambit inmensus, reportavit laureas et triumphos, iamque
        vergens in senium et nomine solo aliquotiens vincens ad tranquilliora
        vitae discessit.
      </p>
      <Modal
        rootNode={document.getElementById('root')}
        isOpen={boolean('isOpen', true)}
        onClose={action('onClose')}
      >
        Modal content
      </Modal>
    </div>
  ));
