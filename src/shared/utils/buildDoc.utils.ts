import { jsPDF } from "jspdf";
import printJS from "print-js";
import {
  EntryDetail,
  EntryRow,
} from "../../store/interfaces/Entry/entry.interfaces";
import Logo from "../../assets/caja_logo.png";
import { getFormattedDate } from "./date.utils";

enum FontEnum {
  HELVETICA = "helvetica",
  TIMES = "times",
}

enum FontStyleEnum {
  NORMAL = "normal",
  BOLD = "bold",
  ITALIC = "italic",
}

enum FontColorEnum {
  RED = "red",
  BLACK = "black",
}

const getCenter = (multiplicity: number): number => 297 / multiplicity;

const setText = (
  doc: jsPDF,
  font: FontEnum = FontEnum.HELVETICA,
  style: FontStyleEnum = FontStyleEnum.NORMAL,
  size: number = 12,
  color: FontColorEnum = FontColorEnum.BLACK
) => {
  doc.setFont(font, style);
  doc.setTextColor(color);
  doc.setFontSize(size);
};

const buildDocHeader = (doc: jsPDF, entryHead: EntryRow, stX: number) => {
  doc.addImage(Logo, "PNG", stX, 5, 20, 20);

  setText(doc, FontEnum.HELVETICA, FontStyleEnum.BOLD, 16);
  doc.text(
    "CAJA COMUNAL CEPO DE ORO",
    stX + getCenter(4),
    15,
    undefined,
    "center"
  );
  setText(doc, FontEnum.TIMES, FontStyleEnum.ITALIC, 16);
  doc.text(
    "Sembrando para el futuro",
    stX + getCenter(4),
    20,
    undefined,
    "center"
  );
  setText(doc, FontEnum.HELVETICA, FontStyleEnum.BOLD, 12, FontColorEnum.RED);
  doc.text(`Nº${entryHead.number}`, stX + 115, 33);
  if (entryHead.is_transfer) doc.text("X", stX + 126, 40);
  else doc.text("X", stX + 89, 40);

  setText(doc);
  doc.text("COMPROBANTE DE INGRESO", stX, 33);
  doc.text(`Nº Cuenta: ${entryHead.account_number}`, stX, 40);
  doc.text("Efectivo", stX + 72, 40);
  doc.text("Transferencia", stX + 98, 40);
  doc.text(`Socio: ${entryHead.names} ${entryHead.surnames}`, stX, 46);

  doc.rect(stX + 88, 36, 5, 5);
  doc.rect(stX + 125, 36, 5, 5);
};

const buildDocTable = (
  doc: jsPDF,
  entryHead: EntryRow,
  entryDetail: EntryDetail[],
  stX: number
) => {
  let stY = 60;
  const cellDescW = 105;
  const cellValueW = 25;
  const cellH = 7;
  const mx = 2;
  const my = 5;

  doc.rect(stX + cellDescW, stY - 7, cellValueW, cellH);

  doc.text("Se recibe por concepto de:", stX, stY - 4);
  doc.text("VALOR", stX + cellDescW + mx + 3, stY - 2);

  entryDetail.forEach((option) => {
    doc.rect(stX, stY, cellDescW, cellH);
    doc.rect(stX + cellDescW, stY, cellValueW, cellH);
    doc.text(option.description, stX + mx, stY + my);
    doc.text(
      option.value ? option.value.toString() : "0",
      stX + mx + cellDescW,
      stY + my
    );
    stY += cellH;
  });

  doc.rect(stX + cellDescW, stY, cellValueW, cellH);
  doc.text(entryHead.amount.toString(), stX + cellDescW + mx, stY + my);
  setText(doc, FontEnum.HELVETICA, FontStyleEnum.BOLD);
  doc.text("TOTAL $=", stX + 84, stY + my);
  setText(doc);

  doc.text(
    `Lugar: ${entryHead.place}, Fecha: ${getFormattedDate(entryHead.date)}`,
    stX,
    150
  );
};

const buildDocFooter = (doc: jsPDF) => {
  doc.line(15, 180, 60, 180);
  doc.line(88, 180, 133, 180);
  doc.text("TESORERIA", 37, 185, undefined, "center");
  doc.text("PRESIDENCIA", 111, 185, undefined, "center");
};

const buildDocComplements = (doc: jsPDF) => {
  doc.setLineDashPattern([2, 2], 1);
  doc.line(getCenter(2), 0, getCenter(2), 210);

  doc.setTextColor(150);
  doc.setFontSize(140);
  doc.setGState(doc.GState({ opacity: 0.5 }));
  doc.text("COPIA", 180, 160, undefined, 45);
};

export const buildDoc = (entryHead: EntryRow, entryDetail: EntryDetail[]) => {
  const doc = new jsPDF("l", "mm", "A4");
  const stX = 10;

  buildDocHeader(doc, entryHead, stX);
  buildDocHeader(doc, entryHead, getCenter(2) + stX);
  buildDocTable(doc, entryHead, entryDetail, stX);
  buildDocTable(doc, entryHead, entryDetail, getCenter(2) + stX);
  buildDocFooter(doc);
  buildDocComplements(doc);

  printJS(URL.createObjectURL(doc.output("blob")));
};
