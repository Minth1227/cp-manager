import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { formDefinitions } from '../forms/definitions';
import { ExportCaseState, stateToFormData } from '../utils/complianceRuleEngine';

interface Props {
  formId: string;
  state: ExportCaseState;
  onClose: () => void;
  onSave: (formId: string, formData: any) => void;
}

export const DynamicFormModal: React.FC<Props> = ({ formId, state, onClose, onSave }) => {
  const formDef = formDefinitions[formId];
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    // 1. Load existing data if any
    let initialData = state.documents[formId]?.formData || {};
    
    // 2. Auto-fill from state if new
    if (Object.keys(initialData).length === 0) {
      initialData = stateToFormData(formId, state);
    }
    
    // 3. Populate defaults from definition
    if (formDef) {
      const sections = formDef.sections || [{ fields: formDef.fields || [] }];
      sections.forEach((section: any) => {
        section.fields.forEach((field: any) => {
          if (field.default && !initialData[field.key]) {
            initialData[field.key] = field.default;
          }
        });
      });
    }

    setFormData(initialData);
  }, [formId, state, formDef]);

  if (!formDef) return null;

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formId, formData);
  };

  const renderField = (field: any) => {
    const value = formData[field.key] || '';
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className="w-full text-sm border-slate-300 rounded-md shadow-sm"
            rows={4}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            disabled={field.readonly}
          />
        );
      case 'select':
        return (
          <select
            className="w-full text-sm border-slate-300 rounded-md shadow-sm"
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            disabled={field.readonly}
          >
            {field.options?.map((opt: string) => (
              <option key={opt} value={opt}>{opt || '선택하세요'}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              className="rounded text-indigo-600 focus:ring-indigo-500"
              checked={!!formData[field.key]}
              onChange={(e) => handleChange(field.key, e.target.checked)}
              disabled={field.readonly}
            />
            {field.labelText || field.label}
          </label>
        );
      default:
        return (
          <input
            type={field.type || 'text'}
            className="w-full text-sm border-slate-300 rounded-md shadow-sm"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            disabled={field.readonly}
          />
        );
    }
  };

  const sections = formDef.sections || [{ title: '기본 정보', fields: formDef.fields || [] }];

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50 rounded-t-xl">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="text-indigo-600 font-black">{formId}</span>
              {formDef.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{formDef.guide}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50">
          {sections.map((section: any, idx: number) => (
            <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field: any) => (
                  <div key={field.key} className={field.type === 'textarea' || field.type === 'checkbox' ? 'col-span-full' : ''}>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      {field.label}
                      {field.readonly && <span className="ml-2 text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">자동입력(Readonly)</span>}
                    </label>
                    {renderField(field)}
                    {field.description && (
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed" dangerouslySetInnerHTML={{__html: field.description}}></p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            취소
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            작성 완료 및 임시저장
          </button>
        </div>
      </div>
    </div>
  );
};
