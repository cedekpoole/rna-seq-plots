import { HTMLTable } from "@blueprintjs/core";

function TopGenesTable({ topGenes }) {
  return (
    <HTMLTable striped={true} className="w-full text-xs">
      <thead>
        <tr>
          <th>#</th>
          <th>Gene</th>
          <th>Loading</th>
        </tr>
      </thead>
      <tbody>
        {topGenes.map((geneData, index) => (
          <tr key={geneData.gene}>
            <td>{index + 1}</td>
            <td>{geneData.gene}</td>
            <td>{geneData.loading.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
}

export default TopGenesTable;
