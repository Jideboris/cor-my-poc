import "./style.css"


import React, { useState } from "react";
import { render } from 'react-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { makeStyles } from '@material-ui/core/styles';
import { Button, Link, Paper, Tabs, Tab } from '@material-ui/core';


const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  const [showLess, setShowLess] = useState(true);
  const [count, setCount] = useState(5);


  const processShowMore = (showLess) => {
    let num = 0;
    let data = 0
    if (showLess) {
      num = count + 5
      data = getData(num);
    }
    else {
      num = count - 5
      data = getData(5);
    }
    setRowData(data);
    setCount(num)
    setShowLess(!showLess)
  };

  const sizeToFit = () => {
    gridApi.sizeColumnsToFit();
  };

  const autoSizeAll = (skipHeader) => {
    var allColumnIds = [];
    gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  };

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML =
      selectedRows.length === 1 ? `Selected Row: Date/Time:${selectedRows[0].dateTime}-Order Number:${selectedRows[0].orderNo}
      -Value:${selectedRows[0].value}-Status:${selectedRows[0].status}-Delivered By:${selectedRows[0].deliveredBy}
      -Return History:${selectedRows[0].returnHistory}-GoodWill:${selectedRows[0].goodWill}-OrderChannel:${selectedRows[0].orderChannel}` : '';
  };

  const createRow = (index) => {
    var dateTime = [`08/04/21 • 11:14`, `09/04/21 • 11:14`, `08/04/20 • 12:14`, `09/05/20 • 10:14`, `10/04/21 • 09:14`];
    var deliveredBy = ['21/04/08', '21/05/09', '21/06/09', '21/05/09', '21/04/07'];
    var status = ['PENDING', 'DELIVERED'];
    var returnHistory = ['Yes', 'No'];
    var check = ['', ''];
    return {
      id: 'D' + (1000 + index),
      check: check[Math.floor(Math.random() * returnHistory.length)],
      dateTime: dateTime[Math.floor(Math.random() * dateTime.length)],
      orderNo: Math.floor(Math.random() * 10000000),
      value: `£${Math.floor(Math.random() * 1000)}.0${Math.floor(Math.random() * 9)}`,
      status: status[Math.floor(Math.random() * status.length)],
      deliveredBy: deliveredBy[Math.floor(Math.random() * deliveredBy.length)],
      returnHistory: returnHistory[Math.floor(Math.random() * returnHistory.length)],
      goodWill: returnHistory[Math.floor(Math.random() * returnHistory.length)],
      orderChannel: returnHistory[Math.floor(Math.random() * returnHistory.length)],
    };
  }

  const getData = (count) => {
    var rowData = [];
    for (var i = 0; i < count; i++) {
      rowData.push(createRow(i));
    }
    return rowData;
  }

  const onGridReady = (params) => {
    const data = getData(count);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    updateData(data)
    //sizeToFit()
    //autoSizeAll()
    // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .then((resp) => resp.json())
    //   .then((data) => updateData(data));
  };

  const dynamicCellStyle = params => {
    if (params.value === 'DELIVERED') {
      return { color: '#0c8117' };
    }
    return { color: '#333333' };
  };

  const showHeight = showLess ? 'ag-theme-alpine wrapper centre' : 'ag-theme-alpine wrapper centre5';

  const icons = {
    // use font awesome for menu icons
    sortAscending: '<img src="./images/sort-arrows-couple-pointing-up-and-down.png" style="height: 12px; width: 12px;padding-right: 2px"/>',
    sortDescending: '<img src="./images/sort-arrows-couple-pointing-up-and-down.png" style="height: 12px; width: 12px;padding-right: 2px"/>',

  };
  const useStyles = makeStyles({
    btn: {
      background: 'white',
      border: '1px solid #05054B',
      borderRadius: 3,
      color: '#05054B',
      padding: '5px 10px',
      marginRight: '15px',
      '&:last-child': {
        marginRight: 0
      }
    },

    link: {

      color: '#05054B',
      textDecoration: 'underline'

    },
    tab: {
      color: '#05054B',
      textTransform: 'none',
      minWidth: '80px',
      fontWeight: 'bold'

    }
  });
  const [navValue, setNavValue] = useState(0);
  const handleChange = (event, value) => {
    console.log("QWERTY", value);
    setNavValue(value);
  }
  const classes = useStyles();
  const message = `Viewing ${1}-${count} of ${10} results`
  const logo = "./images/logo-boot.jpg"
  return (
    <div>
      <div className='btn-left centre3-logo'>
        <img src={logo} height={50} width={100} />
      </div>
      <div className='tab-container'>
        <Tabs className="tabs" value={navValue} onChange={handleChange} >
          <Tab label="All other" className={classes.tab} />
          <Tab label="MGDF" className={classes.tab} disabled />
          <Tab label="Dropship" className={classes.tab} disabled />
          <Tab label="ISO" className={classes.tab} disabled />
        </Tabs>
      </div>

      <div className='btn-container'>
        <div className='btn-right'>
          <Button className={classes.btn} >ALLOCATE TO ME</Button>
          <Button className={classes.btn} >RE-ALLOCATE</Button>
          <Button className={classes.btn} >APPROVE</Button>
          <Button className={classes.btn} >REJECT</Button>
        </div>
      </div>
      <div className={showHeight} >
        {/* <div className="button-bar">
        <button className="mb-2 mr-2 btn btn-alternate btn-lg btn-block" onClick={() => sizeToFit()}>Size to Fit</button>
        <button className="mb-2 mr-2 btn btn-alternate btn-lg btn-block" onClick={() => autoSizeAll(false)}>Auto-Size All</button>
        <button className="mb-2 mr-2 btn btn-alternate btn-lg btn-block" onClick={() => autoSizeAll(true)}>
          Auto-Size All (Skip Header)
        </button>
        <span style={{ font: '20', color: 'black' }} id="selectedRows"></span>
      </div> */}
        <div className="centre3-logo">

        </div>

        <div className="centre3">
          <a
            className="links" style={{ cursor: 'pointer' }}
          >
            <span className="links2">Refresh</span>
          </a>
          {message}
        </div>

        <AgGridReact
          defaultColDef={{
            // width: 180,
            wrapText: true,
            autoHeight: true,
            headerClass: () => {
              return 'header'
            },
            // enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            // editable: true,
            filter: true,
            //floatingFilter: true,
            resizable: true,
          }}
          // pagination={true}
          // paginationPageSize={15}
          defaultColGroupDef={{ marryChildren: true }}
          columnTypes={{
            nonEditableColumn: { editable: false },
            checkColumn: {
              cellRenderer: function (params) {
                var input = document.createElement("input");
                input.type = "checkbox";
                input.checked = params.value;
                input.addEventListener("click", function (event) {
                  params.value = !params.value;
                  params.node.data.selected = params.value;
                  console.log(
                    that.state.rowData.reduce(
                      (acc, obj) => (acc.selected || acc) + ", " + obj.selected
                    )
                  );
                });
                return input;
              }
            }
            // dateColumn: {
            //   floatingFilter: true,
            //   filter: 'agDateColumnFilter',
            //   filterParams: {
            //     comparator: function (filterLocalDateAtMidnight, cellValue) {
            //       var dateParts = cellValue.split('/');
            //       var day = Number(dateParts[0]);
            //       var month = Number(dateParts[1]) - 1;
            //       var year = Number(dateParts[2]);
            //       var cellDate = new Date(year, month, day);
            //       if (cellDate < filterLocalDateAtMidnight) {
            //         return -1;
            //       } else if (cellDate > filterLocalDateAtMidnight) {
            //         return 1;
            //       } else {
            //         return 0;
            //       }
            //     },
            //   },
            // },
          }}

          rowData={rowData}
          popupParent={document.body}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          animateRows={true}
          statusBar={{ items: [{ component: 'agAggregationComponent' }] }}
          enableRangeSelection={true}
          rowSelection="multiple"
        >
          {/* <AgGridColumn headerName=""
          width="10"
          field="check"
          type={['checkColumn']}

        /> */}
          <AgGridColumn
            headerName="Date /Time"
            // width="190"
            field="dateTime"
            // filter={true}
            sortable={true}
            type={['dateColumn', 'nonEditableColumn']}
            checkboxSelection={true}
            icons={icons}
          />
          <AgGridColumn headerName="Order number"
            field="orderNo"
            // width="125"
            sortable={true}
            filter={true}
          />

          <AgGridColumn headerName="Value"
            field="value"
            sortable={true}
            filter={true} />
          <AgGridColumn headerName="Status"
            field="status"
            cellStyle={dynamicCellStyle}
            sortable={true}
            filter={true} />
          <AgGridColumn headerName="Delivered by"
            field="deliveredBy"
            sortable={true}
            filter={true} />
          <AgGridColumn headerName="Return history"
            field="returnHistory"
            type="medalColumn"
            sortable={true}
            filter={true} />
          <AgGridColumn headerName="Goodwill/PCBIP"
            field="goodWill"
            type="medalColumn"
            sortable={true}
            filter={true} />
          <AgGridColumn headerName="Order channel"
            field="orderChannel"
            type="medalColumn"
            sortable={true}
            filter={true} />
        </AgGridReact>
        <br></br>
        <div className="centre2">
          <a
            className="links" style={{ cursor: 'pointer' }}
            onClick={() => processShowMore(showLess)}
          >
            View {showLess ? "More" : "Less"}
          </a>
        </div>

      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));