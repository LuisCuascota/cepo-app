import { Button } from "@mui/material";
import { jsPDF } from "jspdf";
import printJS from "print-js";
import Logo from "../../../assets/caja_logo.png";
import {
  FontColorEnum,
  FontEnum,
  FontStyleEnum,
  getCenter,
  setText,
} from "../../../shared/utils/pdf.utils";

const buildHead = (doc: jsPDF) => {
  doc.addImage(Logo, "PNG", 10, 5, 20, 20);

  setText(doc, FontEnum.HELVETICA, FontStyleEnum.BOLD, 16);
  doc.text(
    "CAJA COMUNAL CEPO DE ORO",
    getCenter(2, "V"),
    15,
    undefined,
    "center"
  );
  setText(doc, FontEnum.TIMES, FontStyleEnum.ITALIC, 16);
  doc.text(
    "Sembrando para el futuro",
    getCenter(2, "V"),
    20,
    undefined,
    "center"
  );
  setText(doc, FontEnum.HELVETICA, FontStyleEnum.BOLD_ITALIC, 14);
  doc.text("TABLA DE AMORTIZACIÓN - PAGARÉ", 10, 30);
  setText(doc, FontEnum.HELVETICA, FontStyleEnum.BOLD, 14, FontColorEnum.RED);
  doc.text("Nº50", 185, 30);
  setText(doc);
  doc.text("Nombre: LUIS SANTIAGO CUASCOTA CHICAIZA", 10, 37);
  doc.text("Fecha: 01-20-2023", 160, 37);
  doc.text("Monto: $1500", 10, 44);
  doc.text("Plazo Meses: 24", 90, 44);
  doc.text("Tasa Mensual: 2%", 160, 44);
};

const buildTable = (doc: jsPDF) => {
  doc.text("Cuota", 11, 52);
  doc.text("Fecha de pago", 28, 52);
  doc.text("Cuota capital", 65, 52);
  doc.text("Interés", 100, 52);
  doc.text("Total a pagar", 126, 52);
  doc.text("Saldo después del pago", 154, 52);

  let stY = 47;

  Array(25)
    .fill(1)
    .map(() => {
      doc.rect(10, stY, 13, 6);
      doc.rect(23, stY, 40, 6);
      doc.rect(63, stY, 30, 6);
      doc.rect(93, stY, 30, 6);
      doc.rect(123, stY, 30, 6);
      doc.rect(153, stY, 47, 6);
      stY += 6;
    });
};

const buildContract = (doc: jsPDF) => {
  setText(doc, FontEnum.HELVETICA, FontStyleEnum.BOLD, 14);
  doc.text("PAGARÉ", getCenter(2, "V"), 203, undefined, "center");
  setText(doc, FontEnum.HELVETICA, FontStyleEnum.NORMAL, 10);
  doc.text(
    "Debo y pagaré solidariamente en la ciudad de ..................................................., o en el lugar que se me reconvenga, a la",
    10,
    207
  );
  doc.text(
    "orden de...........................................................la cantidad de $..................dólares, obligación que tiene causa real, lícita y",
    10,
    211
  );
  doc.text(
    "que es pura,simple,líquida y expresamente determinada.Esta cantidad de dinero me obligo a pagarla incondicionalmente",
    10,
    215
  );
  doc.text(
    "al acreedor, en un plazo de............meses a la vista, contados a partir de la subscripción del presente documento.",
    10,
    219
  );
  doc.text(
    "Me obligo a pagar adicionalmente,todos los gastos judiciales y extrajudiciales que ocasione el cobro.Al fiel cumplimiento",
    10,
    223
  );
  doc.text(
    "de lo estipulado me obligo con todos mis bienes presentes y futuros.A partir del vencimiento pagaré la tasa de mora.....%",
    10,
    227
  );
  doc.text(
    "mensual.Renuncio expresamente a fuero y domicilio,Así mismo declaro que en caso de sucitarse cualquier controversia que",
    10,
    231
  );
  doc.text(
    "se derive de la ejecución del presente pagaré, será sometida al tramite verbal sumario, a elección del autor. Sin protesto",
    10,
    235
  );
  doc.text(
    "eximese de presentación para el pago y de avisos por falta de pago.",
    10,
    239
  );

  setText(doc, FontEnum.HELVETICA, FontStyleEnum.BOLD, 10);
  doc.text("Sangolqui", 100, 207);
  doc.text("Caja de ahorro Cepo de Oro", 30, 211);
  doc.text("1000", 108, 211);
  doc.text("12", 55, 219);
  doc.text("10", 192, 227);
};

const buildFooter = (doc: jsPDF) => {
  setText(doc, FontEnum.HELVETICA, FontStyleEnum.BOLD, 11);
  doc.text("Lugar y fecha: Loresto,", 10, 243);
  doc.text("Vence el:", 130, 243);

  doc.text("FIRMA DEUDOR", 21, 265);
  doc.text("FIRMA GARANTE", getCenter(2, "V"), 265, undefined, "center");
  doc.text("FIRMA GARANTE", 175, 265, undefined, "center");
  doc.text("________________________", 10, 260);
  doc.text(
    "________________________",
    getCenter(2, "V"),
    260,
    undefined,
    "center"
  );
  doc.text("________________________", 200, 260, undefined, "right");
  setText(doc, FontEnum.HELVETICA, FontStyleEnum.NORMAL, 11);
  doc.text("Nombre:..................................", 10, 272);
  doc.text("Cédula:...................................", 10, 281);
  doc.text("Nombre:..................................", 79, 272);
  doc.text("Cédula:...................................", 79, 281);
  doc.text("Nombre:..................................", 149, 272);
  doc.text("Cédula:...................................", 149, 281);
};

const buildDecorator = (doc: jsPDF) => {
  doc.setTextColor(150);
  doc.setFontSize(140);
  doc.setGState(doc.GState({ opacity: 0.5 }));
  doc.text("COPIA", 60, 190, undefined, 45);
};

export const ListLoan = () => {
  const buildDoc = () => {
    const doc = new jsPDF("p", "mm", "A4");

    buildHead(doc);
    buildTable(doc);
    buildContract(doc);
    buildFooter(doc);

    doc.addPage();

    buildHead(doc);
    buildTable(doc);
    buildFooter(doc);
    buildDecorator(doc);

    printJS(URL.createObjectURL(doc.output("blob")));
  };

  return <Button onClick={buildDoc}>Generar</Button>;
};
