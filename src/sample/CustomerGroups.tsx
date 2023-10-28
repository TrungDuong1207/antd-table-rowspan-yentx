import ButtonAdd from '@components/button-add/ButtonAdd'
import ButtonDelete from '@components/button-delete/ButtonDelete'
import ButtonUpdate from '@components/button-update/ButtonUpdate'
import { typeOptions } from '@constants/options'
import { useGetListGroupQuery } from '@services/apiAccountGroup'
import {
  CustomerType,
  GroupAccountParamsInterface,
  GroupDataInterface
} from '@type/accountGroup'
import { viewMode } from '@type/permission'
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillDelete } from 'react-icons/ai'
import GroupModal from './group-modal/GroupModal'
import { SearchOutlined } from '@ant-design/icons'
import CellContent from '@components/cell-content/CellContent'
import { accountStatus } from '@type/customer'

function CustomerGroup() {
  const { t } = useTranslation()

  const [mode, setMode] = useState<viewMode>(viewMode.create)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState<GroupAccountParamsInterface>({
    page: 1,
    take: 10,
    status: accountStatus.VERIFIED
  })
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined)
  const { data: groupCustomer, refetch } = useGetListGroupQuery(search)

  /**
   * control action open and close of modal
   * @param state
   */
  const triggerModal = (state: boolean) => {
    setOpen(state)
  }

  /**
   * memorized data
   */
  const groups = useMemo(() => {
    setLoading(true)
    const data: GroupDataInterface[] = []
    const personalList: GroupDataInterface[] = []
    let personalCount = 0
    let businessCount = 0
    const defaultType = CustomerType.PERSONAL

    for (const item of groupCustomer?.data ?? []) {
      for (let i = 0; i < item.customers?.length ?? 0; i++) {
        const customer = item.customers[i]
        const number =
          item.totalCustomer > 1 ? (i === 0 ? item.totalCustomer : 0) : 1
        const groupData: GroupDataInterface = {
          customerType: item.customerType,
          groupId: item.id,
          name: item.name,
          totalCustomer: number,
          ...customer,
          pointItem: 0
        }

        switch (item.customerType) {
          case defaultType:
            personalCount++
            personalList.push(groupData)
            break
          default:
            businessCount++
            data.push(groupData)
        }
      }
    }

    data.unshift(...personalList)

    if (data.length > 0) {
      const isFirstCustomerPersonal = data[0]?.customerType === defaultType
      const firstPointItem = isFirstCustomerPersonal
        ? personalCount
        : businessCount
      const secondPointItem = isFirstCustomerPersonal
        ? businessCount
        : personalCount

      data[0].pointItem = firstPointItem

      if (data.length > firstPointItem) {
        data[firstPointItem].pointItem = secondPointItem
      }
    }

    setLoading(false)
    return data
  }, [groupCustomer])

  const getCustomerType = (type: CustomerType) => {
    if (type === CustomerType.PERSONAL) {
      return t`customer-group.customer-type.personal`
    } else return t`customer-group.customer-type.enterprise`
  }

  /**
   * define column of table
   */
  const columns: ColumnsType<GroupDataInterface> = [
    {
      title: t`customer-group.type`,
      dataIndex: 'customerType',
      align: 'center',
      key: 'type',
      width: 180,
      render: (value, row) => {
        const obj: any = {
          children: getCustomerType(value),
          props: {}
        }
        if (row.pointItem !== 0) {
          obj.props.rowSpan = row.pointItem
          obj.props.style = { borderBottom: '1px solid rgba(5, 5, 5, 0.06)', borderTop: 'none' }
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    },
    {
      title: t`customer-group.group`,
      dataIndex: 'name',
      align: 'center',
      key: 'name',
      width: 300,
      render: (value, row, index) => {
        const obj: any = {
          children: value,
          props: {}
        }
        if (row.totalCustomer > 0) {
          obj.props.rowSpan = row.totalCustomer
          obj.props.style = { borderBottom: '1px solid rgba(5, 5, 5, 0.06)', borderTop: 'none' }
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    },
    {
      title: t`customer-group.count`,
      dataIndex: 'totalCustomer',
      align: 'center',
      key: 'name',
      width: 90,
      render: (value, row, index) => {
        const obj: any = {
          children: value,
          props: {}
        }
        if (row.totalCustomer > 0) {
          obj.props.rowSpan = row.totalCustomer
          obj.props.style = { borderBottom: '1px solid rgba(5, 5, 5, 0.06)', borderTop: 'none' }
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    },
    {
      title: t`customer-group.OmiPay`,
      dataIndex: 'phoneNumber',
      align: 'center',
      key: 'phoneNumber',
      width: 180
    },
    {
      title: t`customer-group.omipay-name`,
      dataIndex: 'fullName',
      align: 'center',
      key: 'fullName',
      width: 180,
      render: (record) => <CellContent data={record} />
    },
    {
      title: t`customer-group.action`,
      dataIndex: '',
      align: 'center',
      key: '',
      width: 180,
      render: (value, row) => {
        const obj: any = {
          children: (
            <>
              <ButtonUpdate
                type='primary'
                className='mr-10'
                ghost
                onClick={() => {
                  setSelectedId(row.groupId)
                  setMode(viewMode.update)
                  triggerModal(true)
                }}
                module='customer_group'
              />
              <ButtonDelete
                icon={<AiFillDelete />}
                danger
                onClick={() => {
                  setSelectedId(row.groupId)
                  setMode(viewMode.delete)
                  triggerModal(true)
                }}
                module='customer_group'
              />
            </>
          ),
          props: {}
        }
        if (row.totalCustomer > 0) {
          obj.props.rowSpan = row.totalCustomer
          obj.props.style = { borderBottom: '1px solid rgba(5, 5, 5, 0.06)', borderTop: 'none' }
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    }
  ]

  const onSearch = (value: any) => {
    setSearch({ page: 1, ...value })
  }

  return (
    <div className='customer-groups'>
      <Card title={t`customer-group.title`}>
        <Form
          layout='vertical'
          onFinish={onSearch}
        >
          <Row gutter={16}>
            <Col
              xs={24}
              md={12}
              lg={6}
              sm={12}
            >
              <Form.Item
                name='customerType'
                label={t`customer-group.modal.type`}
              >
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  allowClear
                  placeholder={t`customer-group.placeholders.type`}
                  options={typeOptions}
                  onChange={(e) => {
                    if (e === '' || e === undefined) {
                      setSearch({
                        page: 1,
                        ...search,
                        customerType: undefined
                      })
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              md={12}
              lg={6}
              sm={12}
            >
              <Form.Item
                name='name'
                label={t`customer-group.title`}
              >
                <Input
                  allowClear
                  placeholder={t`customer-group.placeholders.groups`.toString()}
                  onChange={(e) => {
                    if (e.target.value === '' || e.target.value === undefined) {
                      setSearch({ page: 1, ...search, name: undefined })
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              md={12}
              lg={6}
              sm={12}
            >
              <Form.Item
                name='customerAccountNumber'
                label={t`customer-group.pay-account`}
              >
                <Input
                  allowClear
                  placeholder={t`customer-group.placeholders.customer`.toString()}
                  onChange={(e) => {
                    if (e.target.value === '' || e.target.value === undefined) {
                      setSearch({
                        page: 1,
                        ...search,
                        customerAccountNumber: undefined
                      })
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              md={12}
              lg={6}
              sm={24}
            >
              <Form.Item label=''>
                <div className='text-end mt-30'>
                  <Button
                    className='mr-10'
                    type='primary'
                    ghost
                    icon={<SearchOutlined />}
                    htmlType='submit'
                  >{t`buttons.search`}</Button>
                  <ButtonAdd
                    module='customer_group'
                    type='primary'
                    onClick={() => {
                      setMode(viewMode.create)
                      triggerModal(true)
                    }}
                  >{t`buttons.add`}</ButtonAdd>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Divider className='mt-20' />
        <Table
          columns={columns}
          dataSource={groups}
          bordered={true}
          scroll={{ x: '100%' }}
          rowKey={'id'}
          locale={{
            emptyText: <Empty description={t`labels.table-nodata`} />
          }}
          pagination={{
            current: groupCustomer?.meta?.page,
            pageSize: groups?.length,
            total: groupCustomer?.meta?.itemCount,
            showSizeChanger: false,
            onChange(page) {
              setSearch({
                ...search,
                page
              })
            }
          }}
        />
      </Card>
      {open &&
        ((selectedId && mode === viewMode.update) ||
          mode === viewMode.create ||
          (selectedId && mode === viewMode.delete)) && (
          <GroupModal
            open={open}
            onCancel={() => triggerModal(false)}
            mode={mode}
            selectedId={selectedId}
            refetch={refetch}
          />
        )}
    </div>
  )
}
export default CustomerGroup
