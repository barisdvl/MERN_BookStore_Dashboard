import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D03AQFEGf7FqyFMsA/profile-displayphoto-shrink_800_800/0/1637518357355?e=1648080000&v=beta&t=PF2QQUB-V7uaJcKAGf-iynfgTM47TxCp8OsJhrZ1VUo"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Baris Develi</span>
            </td>
            <td className="widgetLgDate">02.06.2021</td>
            <td className="widgetLgAmount">$122.00</td>
            <td className="widgetLgStatus">
              <Button type="Approved" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D03AQFEGf7FqyFMsA/profile-displayphoto-shrink_800_800/0/1637518357355?e=1648080000&v=beta&t=PF2QQUB-V7uaJcKAGf-iynfgTM47TxCp8OsJhrZ1VUo"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Baris Develi</span>
            </td>
            <td className="widgetLgDate">02.06.2021</td>
            <td className="widgetLgAmount">$122.00</td>
            <td className="widgetLgStatus">
              <Button type="Declined" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D03AQFEGf7FqyFMsA/profile-displayphoto-shrink_800_800/0/1637518357355?e=1648080000&v=beta&t=PF2QQUB-V7uaJcKAGf-iynfgTM47TxCp8OsJhrZ1VUo"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Baris Develi</span>
            </td>
            <td className="widgetLgDate">02.06.2021</td>
            <td className="widgetLgAmount">$122.00</td>
            <td className="widgetLgStatus">
              <Button type="Pending" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D03AQFEGf7FqyFMsA/profile-displayphoto-shrink_800_800/0/1637518357355?e=1648080000&v=beta&t=PF2QQUB-V7uaJcKAGf-iynfgTM47TxCp8OsJhrZ1VUo"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Baris Develi</span>
            </td>
            <td className="widgetLgDate">02.06.2021</td>
            <td className="widgetLgAmount">$122.00</td>
            <td className="widgetLgStatus">
              <Button type="Approved" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
