'use client'
import { useState } from 'react'
import { ScaffoldForm } from '@/components/ScaffoldForm'
import { ResultsPanel } from '@/components/ResultsPanel'
import { ElevationView } from '@/components/ElevationView'
import MtoPanel from '@/components/MtoPanel'
import { runCalc } from '@/lib/calc/index'
import { calculateMto } from '@/lib/calc/mto'
import { CalcResult, ScaffoldParams } from '@/lib/calc/types'

export default function Home() {
  const [result, setResult] = useState<CalcResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submittedParams, setSubmittedParams] = useState<Record<string, unknown> | null>(null)

  function handleSubmit(params: Record<string, unknown>) {
    setIsLoading(true)
    setError(null)
    setSubmittedParams(params)
    try {
      const calcResult = runCalc(params)
      setResult(calcResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Scaffolding Calculator</h1>
        <p className="text-sm text-slate-400 mt-1">
          NASC TG20:13 · BS EN 5975 · Tube-and-fitting scaffold
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
          <span>✓ TG20 table compliance check</span>
          <span>✓ EN 1993-1-1 Euler buckling check</span>
          <span>✓ Ground bearing check</span>
          <span>✓ Calc sheet &amp; method statement download</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
          <ScaffoldForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
          {error && (
            <div className="rounded bg-red-900/30 border border-red-700 p-3 text-sm text-red-300">
              {error}
            </div>
          )}
          {result ? (
            <ResultsPanel result={result} />
          ) : !error ? (
            <div className="flex items-center justify-center h-full min-h-32">
              <p className="text-sm text-slate-500">Results will appear here after you submit the form.</p>
            </div>
          ) : null}
        </div>
      </div>

      {result && submittedParams && (
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
            <ElevationView params={submittedParams as unknown as ScaffoldParams} />
          </div>
          <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
            <MtoPanel
              mto={calculateMto(submittedParams as unknown as ScaffoldParams)}
              jobRef={result.jobRef}
            />
          </div>
        </div>
      )}

      <div className="mt-8 text-center space-y-1">
        <p className="text-xs text-slate-600">
          TG20 table values are representative — verify against your NASC TG20:13 eGuide before production use.
        </p>
        <p className="text-xs text-slate-700">
          Not a substitute for a competent person&apos;s assessment. Always comply with site-specific requirements.
        </p>
      </div>
    </main>
  )
}
