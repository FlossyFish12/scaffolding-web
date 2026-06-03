'use client'
import { useState } from 'react'

interface FormState {
  job_ref: string
  height_m: string
  bay_length_m: string
  lift_height_m: string
  boards: string
  load_class: string
  wind_zone: string
  tie_pattern: string
  ground_bearing_kpa: string
}

interface ScaffoldFormProps {
  onSubmit: (params: Record<string, unknown>) => void
  isLoading: boolean
}

const REQUIRED_FIELDS: (keyof FormState)[] = [
  'height_m', 'bay_length_m', 'boards', 'load_class', 'wind_zone', 'tie_pattern',
]

export function ScaffoldForm({ onSubmit, isLoading }: ScaffoldFormProps) {
  const [form, setForm] = useState<FormState>({
    job_ref: '', height_m: '', bay_length_m: '', lift_height_m: '2.0',
    boards: '', load_class: '', wind_zone: '', tie_pattern: 'alternate',
    ground_bearing_kpa: '50',
  })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (fieldErrors[name as keyof FormState]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errors: Partial<Record<keyof FormState, string>> = {}
    for (const field of REQUIRED_FIELDS) {
      if (!form[field]) errors[field] = 'Required'
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})
    onSubmit({
      job_ref: form.job_ref || undefined,
      height_m: parseFloat(form.height_m),
      bay_length_m: parseFloat(form.bay_length_m),
      lift_height_m: parseFloat(form.lift_height_m),
      boards: parseInt(form.boards),
      load_class: parseInt(form.load_class),
      wind_zone: parseInt(form.wind_zone),
      tie_pattern: form.tie_pattern,
      ground_bearing_kpa: parseFloat(form.ground_bearing_kpa),
    })
  }

  function field(
    name: keyof FormState,
    label: string,
    placeholder: string,
    type: 'text' | 'number' = 'number',
  ) {
    const error = fieldErrors[name]
    return (
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          step="any"
          className={`w-full rounded bg-slate-800 border px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-slate-600'
          }`}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Job</p>
        {field('job_ref', 'Job Reference (optional)', 'e.g. SITE-001', 'text')}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Geometry</p>
        <div className="grid grid-cols-2 gap-3">
          {field('height_m', 'Height (m)', 'e.g. 12.0')}
          {field('bay_length_m', 'Bay length (m)', 'e.g. 2.1')}
          {field('lift_height_m', 'Lift height (m)', 'default 2.0')}
          {field('boards', 'Boards (3–5)', 'e.g. 4')}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Loads & Exposure</p>
        <div className="grid grid-cols-2 gap-3">
          {field('load_class', 'Load class (1–6)', 'e.g. 2')}
          {field('wind_zone', 'Wind zone (1–4)', 'e.g. 2')}
          {field('ground_bearing_kpa', 'Ground bearing (kPa)', 'default 50')}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Tie pattern</label>
            <select
              name="tie_pattern"
              value={form.tie_pattern}
              onChange={handleChange}
              className="w-full rounded bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="alternate">Alternate</option>
              <option value="every_lift">Every lift</option>
              <option value="every_bay">Every bay</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Running…' : 'Run Calculations →'}
      </button>
    </form>
  )
}
