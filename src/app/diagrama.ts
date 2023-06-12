import Highcharts from "Highcharts";
import Sankey from "highcharts/modules/sankey"
import Accessibility from "highcharts/modules/accessibility";
import Exporting from "highcharts/modules/exporting"

Sankey(Highcharts)
Accessibility(Highcharts)
Exporting(Highcharts)

const Grafico = (data: any) => {
  Highcharts.chart("container", {
    title: {
      text: "Materias Pendientes",
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.from} to {point.to}, {point.weight}.",
      },
    },
    series: [
      {
        keys: ["from", "to", "weight"],
        data,
        type: "sankey",
        name: "Materia",
      },
    ],
  });
};

export { Grafico };
