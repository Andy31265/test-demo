import React from 'react';
import { Form, Input, InputNumber, Select, Button, Upload, Card, Steps, message, Typography } from 'antd';
import { UploadOutlined, HomeOutlined, InfoCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { LOCATIONS, PROPERTY_TYPES, DIRECTIONS } from '../../constants';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const SubmitPropertyPage: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = React.useState(0);

  const onFinish = (values: any) => {
    console.log('Submitted:', values);
    message.success('Đăng tin thành công! Chúng tôi sẽ liên hệ để xác thực.');
    setCurrentStep(2);
  };

  const next = async () => {
    try {
        await form.validateFields();
        setCurrentStep(currentStep + 1);
    } catch (error) {
        console.log('Validation failed');
    }
  };

  const prev = () => setCurrentStep(currentStep - 1);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <Title level={2}>Đăng Tin Mua Bán Nhà Đất</Title>
        <Text type="secondary">Tiếp cận hàng nghìn khách hàng tiềm năng tại Bảo Lộc mỗi ngày</Text>
      </div>

      <Card className="shadow-lg rounded-xl">
        <Steps current={currentStep} className="mb-8 px-4 md:px-12">
           <Steps.Step title="Thông tin cơ bản" icon={<HomeOutlined />} />
           <Steps.Step title="Chi tiết & Hình ảnh" icon={<InfoCircleOutlined />} />
           <Steps.Step title="Hoàn tất" icon={<CheckOutlined />} />
        </Steps>

        {currentStep < 2 ? (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ listingType: 'sale', propertyType: 'land' }}
          >
            {currentStep === 0 && (
              <div className="animate-fade-in">
                <Form.Item name="title" label="Tiêu đề tin đăng" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                  <Input placeholder="Vd: Bán đất nền Lộc An, DT 500m2, sổ sẵn" size="large" />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item name="listingType" label="Hình thức">
                    <Select size="large">
                      <Option value="sale">Cần bán</Option>
                      <Option value="rent">Cho thuê</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="propertyType" label="Loại bất động sản">
                    <Select size="large">
                      {PROPERTY_TYPES.map(t => <Option key={t.value} value={t.value}>{t.label}</Option>)}
                    </Select>
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <Form.Item name="province" label="Tỉnh/Thành" initialValue="Lâm Đồng">
                      <Input disabled />
                   </Form.Item>
                   <Form.Item name="district" label="Quận/Huyện" initialValue="Bảo Lộc">
                      <Input disabled />
                   </Form.Item>
                   <Form.Item name="ward" label="Phường/Xã" rules={[{ required: true }]}>
                      <Select placeholder="Chọn phường xã">
                         {LOCATIONS.map(l => <Option key={l.value} value={l.value}>{l.label}</Option>)}
                      </Select>
                   </Form.Item>
                   <Form.Item name="address" label="Địa chỉ cụ thể" rules={[{ required: true }]}>
                      <Input placeholder="Số nhà, tên đường..." />
                   </Form.Item>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="animate-fade-in">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Form.Item name="price" label="Giá bán" rules={[{ required: true }]}>
                       <InputNumber 
                          style={{ width: '100%' }} 
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                          addonAfter="VNĐ"
                       />
                    </Form.Item>
                    <Form.Item name="area" label="Diện tích" rules={[{ required: true }]}>
                       <InputNumber style={{ width: '100%' }} addonAfter="m²" />
                    </Form.Item>
                    <Form.Item name="direction" label="Hướng">
                       <Select>
                          {DIRECTIONS.map(d => <Option key={d.value} value={d.value}>{d.label}</Option>)}
                       </Select>
                    </Form.Item>
                 </div>

                 <Form.Item name="description" label="Mô tả chi tiết" rules={[{ required: true }]}>
                    <TextArea rows={6} placeholder="Mô tả chi tiết về vị trí, tiện ích, pháp lý..." />
                 </Form.Item>

                 <Form.Item label="Hình ảnh (Tối đa 8 ảnh)">
                    <Upload listType="picture-card" maxCount={8}>
                       <div>
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Tải ảnh</div>
                       </div>
                    </Upload>
                 </Form.Item>

                 <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <Title level={5}>Thông tin liên hệ</Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <Form.Item name="contactName" label="Tên liên hệ" rules={[{ required: true }]}>
                          <Input />
                       </Form.Item>
                       <Form.Item name="contactPhone" label="Số điện thoại" rules={[{ required: true }]}>
                          <Input />
                       </Form.Item>
                    </div>
                 </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-4 border-t">
               {currentStep > 0 && (
                  <Button onClick={prev} size="large">Quay lại</Button>
               )}
               {currentStep < 1 && (
                  <Button type="primary" onClick={next} size="large" className="ml-auto bg-emerald-600">Tiếp tục</Button>
               )}
               {currentStep === 1 && (
                  <Button type="primary" htmlType="submit" size="large" className="ml-auto bg-emerald-600">Đăng Tin Ngay</Button>
               )}
            </div>
          </Form>
        ) : (
          <div className="text-center py-12">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-3xl">
                <CheckOutlined />
             </div>
             <Title level={3}>Tin đăng đã được gửi thành công!</Title>
             <Text className="block mb-8">Đội ngũ admin sẽ kiểm duyệt tin của bạn trong vòng 24h.</Text>
             <Button type="primary" className="bg-emerald-600" onClick={() => window.location.href = '/'}>
                Về trang chủ
             </Button>
          </div>
        )}
      </Card>
    </div>
  );
};