import React, { useEffect, useState } from 'react'
import "assets/css/MemberExpiry/MemberExpiry.css"
import Cards from 'components/Cards/Cards'
import { Table, Select } from 'antd';

const columns = [
  { title: 'Company Name', dataIndex: 'companyname' },
  { title: 'Country', dataIndex: 'country' },
  { title: 'Expiry Date', dataIndex: 'expirydate' },
  { title: 'Status', dataIndex: 'status' },
];

const InsideMemberExpiry = ({ licensesList }) => {
  const [SC, setSC] = useState('');
  const para = `Below is a list of companies whose memberships have either expired or are nearing expiration. To maintain uninterrupted business operations and ensure compliance, we will send a reminder email 30 days before the membership expiration date, prompting them to renew. Please check this section regularly for updates on upcoming expirations.`;

  const [expiryMember, setExpiryMember] = useState([]);

  useEffect(() => {
    let exmember = [];
    if (Object.keys(licensesList).length > 0 && licensesList.data.length > 0) {
      licensesList.data.forEach((item, index) => {
        // Check if the item matches the selected status or if no status is selected
        if (item.status === SC || !SC) {
          exmember.push({
            key: index + 1,
            companyname: item.company_name,
            country: item.country,
            expirydate: item.expiry_date,
            status: item.status,
          });
        }
      });
      console.log("expiryMember (before update):", exmember);
      setExpiryMember(exmember);
    }
    console.log("expiryMember (after update):", exmember);
  }, [licensesList, SC]); 


  const options = [
    {
      value: 'Active',
      label: 'Active',
    },
    {
      value: 'In Grace Period',
      label: 'Grace Period',
    }
  ]

  return (
    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
      <Cards
        heading="Members Expiry"
        Para={para}
      />
      <div className="widget-content widget-content-area br-6" style={{ marginTop: "25px" }}>
        <div className="col-12 d-flex flex-md-row flex-row mb-4">
          <div className="col-md-6 col-6">
            {/* <h4 style={{ fontSize: "18px", color: "black", fontWeight: "700", }}>Members Expiry</h4> */}
          </div>
          <div className='col-6 col-md-6 d-flex justify-content-end  contact-options'>
            <div className='col-12 col-md-6 d-flex justify-content-end '>
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "12px" }}
                placeholder={'Search Status'}
                optionFilterProp={'children'}
                options={options}
                onChange={(value) => {
                  setSC(value);
                }}
              />
            </div>
          </div>
        </div>
        <br />
        <div className='w-100'>
          <Table
            columns={columns}
            dataSource={expiryMember}
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ['20', '50', '100'],
            }}
            locale={{ emptyText: (<span>No Members Expired</span>) }}
          />
        </div>
      </div>
    </div>
  )
}

export default InsideMemberExpiry