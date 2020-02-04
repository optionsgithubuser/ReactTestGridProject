import React,{Component} from "react";
import data from "./data";
import DataGrid, {Column, Scrolling, SearchPanel,Editing} from "devextreme-react/data-grid";
import {Dropdown, Menu, Spin, Input} from "antd";
import clonedeep from "lodash.clonedeep";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import 'antd/dist/antd.css';

class OrderGuideDetails extends Component{

     state = {
         isEdit: false,
         details: data,

     }

    onEditRecord = (selectedRecord, isEdit) => {
        this.setState({
            selectedRecord: clonedeep(selectedRecord),
            isEdit
        })
    }


    onCancelSaveRecord  = () => {
        this.setState({
            selectedRecord: null
        })
    }

    onRecordChange = (event) => {
        const {selectedRecord} = this.state;
        selectedRecord[event.target.name] = event.target.value;
        this.setState({
            selectedRecord,
        });
    }


    onEditBidRecord = (selectedRowsData) => {
        this.setState({
            selectedEditBidRecord: selectedRowsData && selectedRowsData.selectedRowsData[0],
            selectedItemKeys: selectedRowsData.selectedRowKeys
        });
    }
  
    onFocusedRowChanged = (data) => {
        if (this.state.selectedItemKeys === data.row.key) {
          return;
        }
        this.setState({
          selectedEditBidRecord: data.row.data,
          selectedItemKeys: data.row.key,
        });
    }

    render() {
         const {selectedRecord, isSaving, details} = this.state;
        return(
            <div>
                <DataGrid
                    refCallback={(dg) => this.dg = dg}
                    dataSource={details}
                    columnAutoWidth={false}
                    keyExpr="PKey_OP_OrderGuide_Detail"
                    selection={{ mode: 'single' }}
                    focusedRowEnabled={true}
                    selectedRowKeys={this.state.selectedItemKeys}
                    onFocusedRowChanged={this.onFocusedRowChanged}
                >
                    <Editing
                      refreshMode={'full'}
                      mode={'cell'}
                      allowUpdating={true}
                      useIcons={false}
                    />
                    <Scrolling mode={'virtual'} />
                    <SearchPanel visible={true} width={240} placeholder={'Search...'} />
                    <Column alignment={"left"} width={"8%"} caption={'Qty'} dataField={'Qty'}/>
                    <Column alignment={"left"} width={"8%"} caption={'Par'} dataField={'ParLevel'}/>
                    <Column alignment={"left"} width={"25%"}  caption={'Name'} dataField={'SupplierBidName'}/>
                    <Column alignment="left" caption={'Pack/Size'} allowEditing={false} cellRender={(record) => {
                      return <span>{`${record.data.ItemPack || record.data.ItemPack === 0 ? record.data.ItemPack : ''}/${record.data.ItemSize || record.data.ItemSize === 0 ? record.data.ItemSize : ''} ${record.data.UOM || ''}`}</span>
                    }} />
                    <Column alignment={"left"} width={100} headerCellRender={() => <span className="mr-10 text-primary cursor-pointer" >New</span>}   cellRender={(record) => {
                        const menu = (
                            <Menu>
                                <Menu.Item >
                                    <span className="text-primary ml-5 cursor-pointer">Pricing History</span>
                                </Menu.Item>
                                <Menu.Item>
                                    <span className="text-primary ml-5 cursor-pointer">Edit Detail</span>
                                </Menu.Item>
                                <Menu.Item>
                                    <span className="text-primary ml-5 cursor-pointer">Delete</span>
                                </Menu.Item>
                            </Menu>
                        );
                        if(selectedRecord && selectedRecord.PKey_OP_OrderGuide_Detail === record.data.PKey_OP_OrderGuide_Detail) {
                            return (
                                <div>
                                    <span className="mr-2 text-primary cursor-pointer">{ isSaving ? <Spin size={"small"}/>  : 'Save'}</span>
                                    <span className="text-primary cursor-pointer" onClick={this.onCancelSaveRecord}>Cancel</span>
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex-align-item-center d-flex">
                                    <span className="text-primary cursor-pointer" onClick={() => this.onEditRecord(record.data, true)}>Edit</span>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <i className="icon-options-vertical text-primary cursor-pointer" />
                                    </Dropdown>
                                </div>
                            );
                        }
                    }}/>
                </DataGrid>
            </div>
        )
    }

}

export default OrderGuideDetails
